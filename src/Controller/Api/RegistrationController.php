<?php

namespace App\Controller\Api;

use App\Entity\User;
use App\Repository\UserRepository;
use App\Security\EmailVerifier;
use App\Service\GeneratorService;
use DateTimeImmutable;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mime\Address;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Exception\NotEncodableValueException;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use SymfonyCasts\Bundle\VerifyEmail\Exception\VerifyEmailExceptionInterface;

/**
 * @Route(host="api.eco-friendly.localhost")
 */
class RegistrationController extends AbstractController
{
    private EmailVerifier $emailVerifier;

    public function __construct(EmailVerifier $emailVerifier)
    {
        $this->emailVerifier = $emailVerifier;
    }

    /**
     * @Route("/v2/signup", name="api_users_signup", methods={"POST"})
     */
    public function signup(
        Request $request,
        SerializerInterface $serializer,
        GeneratorService $generator,
        ValidatorInterface $validator,
        UserPasswordHasherInterface $userPasswordHasher,
        UserRepository $userRepository
    ): Response {
        try {
            $user = $serializer->deserialize($request->getContent(), User::class, 'json');

            // Ensure that first name & last name are capitalized
            $user->setFirstName(ucfirst($user->getFirstName()));
            $user->setLastName(ucfirst($user->getLastName()));

            $user->setCode($generator->codeGen());
            $user->setRoles(['ROLE_USER']);
            $user->setAvatar('https://cdn.eco-friendly.fr/assets/img/misc/default-avatar.png');
            $user->setIsActive(true);
            $user->setIsVerified(false);
            $user->setCreatedAt(new DateTimeImmutable());
        } catch (NotEncodableValueException $e) {
            return $this->json(['errors' => ['json' => ['Json non valide']]], Response::HTTP_BAD_REQUEST);
        }

        $errors = $validator->validate($user, null, ['Default', 'registration']);

        if (count($errors) > 0) {
            $errorsArray = [];
            foreach ($errors as $error) {
                $errorsArray[$error->getPropertyPath()][] = $error->getMessage();
            }
            return $this->json(['errors' => $errorsArray], Response::HTTP_BAD_REQUEST);
        }
        $user->setPassword($userPasswordHasher->hashPassword($user, $user->getPassword()));
        $userRepository->add($user, true);

        // generate a signed url and email it to the user
        $this->emailVerifier->sendEmailConfirmation(
            'api_verify_email',
            $user,
            (new TemplatedEmail())
                ->from(new Address('no-reply@eco-friendly.fr', 'Eco-Friendly'))
                ->to($user->getEmail())
                ->subject('Confirmez votre adresse email et rejoignez-nous !')
                ->htmlTemplate('email/email_confirmation.html.twig')
        );

        // Return a response with a 201 status code only as the user is not yet verified
        return $this->json(['nickname' => $user->getNickname(), 'email' => $user->getEmail()], Response::HTTP_CREATED);
    }

    /**
     * @Route("/v2/resend-email-confirmation", name="api_users_resendemailconfirmation", methods={"POST"})
     */
    public function resendEmailConfirmation(
        Request $request,
        UserRepository $userRepository
    ): Response {
        $email = json_decode($request->getContent(), true)['email'];
        $user = $userRepository->findOneBy(['email' => $email]);

        // Weither the user doesn't exist or is already verified, we return a 400 status code with a generic message
        if (!$user || $user->isVerified()) {
            return $this->json(['errors' => ['email' => ['Cette adresse email n\'est pas en attente de validation']]], Response::HTTP_BAD_REQUEST);
        }

        // Generate a signed url and email it to the user
        $this->emailVerifier->sendEmailConfirmation(
            'api_verify_email',
            $user,
            (new TemplatedEmail())
                ->from(new Address('no-reply@eco-friendly.fr', 'Eco-Friendly'))
                ->to($user->getEmail())
                ->subject('Confirmez votre adresse email et rejoignez-nous !')
                ->htmlTemplate('email/email_confirmation.html.twig')
        );

        // Returns a response with a 200 status code as the user is not yet verified
        return $this->json(['nickname' => $user->getNickname(), 'email' => $user->getEmail()], Response::HTTP_OK);
    }

    /**
     * @Route("/verify/email", name="api_verify_email")
     */
    public function verifyUserEmail(Request $request, UserRepository $userRepository): Response
    {
        $id = $request->get('id');

        if (!$id) {
            return $this->redirectToRoute('app_root');
        }

        $user = $userRepository->find($id);

        if (!$user) {
            return $this->redirectToRoute('app_root');
        }
        try {
            $this->emailVerifier->handleEmailConfirmation($request, $user);
        } catch (VerifyEmailExceptionInterface $exception) {
            return $this->json(['errors' => $exception->getReason()], Response::HTTP_BAD_REQUEST);
        }
        return $this->redirect('https://eco-friendly.fr/validation');
    }
}
