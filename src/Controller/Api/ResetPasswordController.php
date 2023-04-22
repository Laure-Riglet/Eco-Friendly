<?php

namespace App\Controller\Api;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Address;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Exception\NotEncodableValueException;
use SymfonyCasts\Bundle\ResetPassword\Controller\ResetPasswordControllerTrait;
use SymfonyCasts\Bundle\ResetPassword\Exception\ResetPasswordExceptionInterface;
use SymfonyCasts\Bundle\ResetPassword\ResetPasswordHelperInterface;

/**
 * @Route(host="api.eco-friendly.localhost")
 */
class ResetPasswordController extends AbstractController
{
    use ResetPasswordControllerTrait;

    private ResetPasswordHelperInterface $resetPasswordHelper;
    private EntityManagerInterface $entityManager;

    public function __construct(ResetPasswordHelperInterface $resetPasswordHelper, EntityManagerInterface $entityManager)
    {
        $this->resetPasswordHelper = $resetPasswordHelper;
        $this->entityManager = $entityManager;
    }

    /**
     * Endpoint to request a password reset.
     * @Route("/v2/reset-password", name="api_forgotpassword_request", methods={"POST"})
     */
    public function request(
        Request $request,
        MailerInterface $mailer
    ): Response {
        try {
            $email = json_decode($request->getContent(), true)['email'];
        } catch (NotEncodableValueException $e) {
            return $this->json(['errors' => ['json' => ['Json non valide']]], Response::HTTP_BAD_REQUEST);
        }

        $user = $this->entityManager->getRepository(User::class)->findOneBy([
            'email' => $email,
        ]);

        // Do not reveal whether a user account was found or not.
        if ($user) {
            try {
                $resetToken = $this->resetPasswordHelper->generateResetToken($user);
            } catch (ResetPasswordExceptionInterface $e) {
                // Standard message even if a request was already sent.
                return $this->json([], Response::HTTP_OK);
            }

            $email = (new TemplatedEmail())
                ->from(new Address('no-reply@eco-friendly.fr', 'Eco-Friendly'))
                ->to($user->getEmail())
                ->subject('Réinitialisation de votre mot de passe')
                ->htmlTemplate('reset_password/email-api.html.twig')
                ->context([
                    'resetToken' => $resetToken,
                ]);

            $mailer->send($email);
        } else {
            // Generate a fake token if the user does not exist or someone hit this page directly.
            // This prevents exposing whether or not a user was found with the given email address or not
            $resetToken = $this->resetPasswordHelper->generateFakeResetToken();
        }
        return $this->json([], Response::HTTP_OK);
    }

    /**
     * Validates and process the reset URL that the user clicked in their email.
     * @Route("/v2/reset-password/reset/{token}", name="api_reset_password", methods={"POST"})
     */
    public function reset(Request $request, UserPasswordHasherInterface $userPasswordHasher, string $token = null): Response
    {
        if (!$token) {
            return $this->json(['message' => 'Aucun token de réinitialisation de mot de passe trouvé.'], Response::HTTP_NOT_FOUND);
        }

        try {
            $user = $this->resetPasswordHelper->validateTokenAndFetchUser($token);
        } catch (ResetPasswordExceptionInterface $e) {
            return $this->json(['message' => 'Une erreur est survenue lors de la réinitialisation du mot de passe. Veuillez réessayer.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        // The token is valid; allow the user to change their password.

        // A password reset token should be used only once, remove it.
        $this->resetPasswordHelper->removeResetRequest($token);

        // Encode(hash) the plain password, and set it.
        $encodedPassword = $userPasswordHasher->hashPassword(
            $user,
            json_decode($request->getContent(), true)['password']
        );

        $user->setPassword($encodedPassword);
        $this->entityManager->flush();

        return $this->json(['message' => 'Votre mot de passe a été réinitialisé avec succès.'], Response::HTTP_OK);
    }
}
