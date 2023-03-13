<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\UserListType;
use App\Form\ProfileType;
use App\Form\UserType;
use App\Repository\UserRepository;
use App\Service\CodeGeneratorService;
use App\Service\GeneratorService;
use App\Service\SluggerService;
use DateTime;
use DateTimeImmutable;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Address;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;

class UserController extends AbstractController

// TODO: rework this controller and the related voter to clearly separate the possible
// TODO: backoffice actions on different roles (user and author)

{
    /**
     * @Route("/back_office/utilisateurs/membres", name="app_backoffice_members_list", methods={"GET", "POST"})
     * @isGranted("ROLE_ADMIN", message="Accès réservé aux administrateurs")
     */
    public function listMembers(Request $request, UserRepository $userRepository): Response
    {
        $users = $userRepository->listAllMembers();

        $form = $this->createForm(UserListType::class);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $users = $userRepository->listAllMembersWithFilter(
                $form->get('sortType')->getData() ?? 'created_at',
                $form->get('sortOrder')->getData() ?? 'DESC',
                $form->get('is_verified')->getData(),
                $form->get('is_active')->getData(),
                $form->get('email')->getData(),
                $form->get('firstname')->getData(),
                $form->get('lastname')->getData(),
                $form->get('nickname')->getData(),
                $form->get('code')->getData(),
                DateTimeImmutable::createFromMutable($form->get('dateFrom')->getData() ?? new DateTime('2000-01-01')),
                DateTimeImmutable::createFromMutable($form->get('dateTo')->getData() ?? new DateTime('now'))
            );

            return $this->render('user/list.html.twig', [
                'users' => $users,
                'form' => $form->createView()
            ]);
        }

        return $this->renderForm('user/list.html.twig', [
            'users' => $users,
            'form' => $form
        ]);
    }

    /**
     * @Route("/back_office/utilisateurs/auteurs", name="app_backoffice_authors_list", methods={"GET", "POST"})
     * @isGranted("ROLE_ADMIN", message="Accès réservé aux administrateurs")
     */
    public function listAuthors(Request $request, UserRepository $userRepository): Response
    {
        $users = $userRepository->listAllAuthors();

        $form = $this->createForm(UserListType::class);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $users = $userRepository->listAllAuthorsWithFilter(
                $form->get('sortType')->getData() ?? 'created_at',
                $form->get('sortOrder')->getData() ?? 'DESC',
                $form->get('is_verified')->getData(),
                $form->get('is_active')->getData(),
                $form->get('email')->getData(),
                $form->get('firstname')->getData(),
                $form->get('lastname')->getData(),
                $form->get('nickname')->getData(),
                $form->get('code')->getData(),
                DateTimeImmutable::createFromMutable($form->get('dateFrom')->getData() ?? new DateTime('2000-01-01')),
                DateTimeImmutable::createFromMutable($form->get('dateTo')->getData() ?? new DateTime('now'))
            );

            return $this->render('user/list.html.twig', [
                'users' => $users,
                'form' => $form->createView()
            ]);
        }

        return $this->renderForm('user/list.html.twig', [
            'users' => $users,
            'form' => $form
        ]);
    }

    /**
     * @Route("/back_office/utilisateurs/ajouter", name="app_backoffice_users_new", methods={"GET", "POST"})
     * @isGranted("ROLE_ADMIN", message="Accès réservé aux administrateurs")
     */
    public function new(
        Request $request,
        GeneratorService $generator,
        UserPasswordHasherInterface $passwordHasher,
        UserRepository $userRepository,
        MailerInterface $mailer
    ): Response {
        $user = new User();
        $user->setCreatedAt(new DateTimeImmutable());
        $user->setRoles(['ROLE_AUTHOR']);
        $user->setAvatar('https://eco-friendly.fr/assets/img/misc/default-avatar.png');
        $user->setIsActive(true);
        $user->setIsVerified(false);
        $user->setCode($generator->codeGen());
        $tempPassword = $generator->passwordGen();
        $user->setPassword($tempPassword);

        $form = $this->createForm(UserType::class, $user);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {

            $user->setPassword($passwordHasher->hashPassword($user, $tempPassword));

            $avatarFile = $form->get('avatarFile')->getData();

            if ($avatarFile) {
                $extension = $avatarFile->guessExtension();
                if (!in_array($extension, ['jpg', 'jpeg', 'png'])) {
                    $this->addFlash('danger', 'Format d\'image non supporté');
                }

                $filename = $user->getId() . '-' . uniqid() . '.' . $extension;
                $filepath = $this->getParameter('uploads_user_directory') . '/' . $filename;

                try {
                    $avatarFile->move(
                        $this->getParameter('uploads_user_directory'),
                        $filename
                    );
                } catch (FileException $e) {
                    $this->addFlash('danger', 'Une erreur est survenue lors de l\'upload de l\'image');
                }

                list($width, $height) = getimagesize($filepath);
                $size = min($width, $height); // get the minimum dimension
                $dst_x = ($width - $size) / 2;
                $dst_y = ($height - $size) / 2;
                $src_x = 0;
                $src_y = 0;
                $new_width = $new_height = 80;

                if ($extension === 'png') {
                    $image = imagecreatefrompng($filepath);
                } else {
                    $image = imagecreatefromjpeg($filepath);
                }

                $new_image = imagecreatetruecolor($new_width, $new_height);
                imagecopyresampled($new_image, $image, 0, 0, $src_x + $dst_x, $src_y + $dst_y, $new_width, $new_height, $size, $size);

                if ($extension === 'png') {
                    imagepng($new_image, $filepath);
                } else {
                    imagejpeg($new_image, $filepath);
                }

                imagedestroy($image);
                imagedestroy($new_image);

                $user->setAvatar($this->getParameter('uploads_user_url') . $filename);
            }

            $userRepository->add($user, true);

            $email = (new TemplatedEmail())
                ->from(new Address('no-reply@eco-friendly.fr', 'Eco-Friendly'))
                ->to($user->getEmail())
                ->subject('Votre compte Eco-Friendly a été créé !')
                ->htmlTemplate("email/profile_creation.html.twig")
                ->context([
                    'username' => $user->getEmail(),
                    'password' => $tempPassword,
                ]);

            $mailer->send($email);

            $this->addFlash(
                'success',
                'Le profil de ' . $user->getFirstname() . ' ' . $user->getLastname() . ' a bien été créé.'
            );

            return $this->redirectToRoute('app_backoffice_authors_list', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('user/new.html.twig', [
            'user' => $user,
            'form' => $form,
        ]);
    }

    /**
     * @Route("/back_office/utilisateurs/{id}", name="app_backoffice_users_show", requirements={"id":"\d+"}, methods={"GET"})
     */
    public function show(User $user): Response
    {
        return $this->render('user/show.html.twig', [
            'user' => $user,
        ]);
    }

    /**
     * @Route("/back_office/auteurs/{id}/creer", name="app_backoffice_users_create", requirements={"id":"\d+"}, methods={"GET", "POST"})
     */
    public function create(
        Request $request,
        User $user,
        UserRepository $userRepository,
        UserPasswordHasherInterface $passwordHasher
    ): Response {
        $form = $this->createForm(ProfileType::class, $user);
        $form->handleRequest($request, null, ['validation_groups' => ['Default']]);

        if ($form->isSubmitted() && $form->isValid()) {
            $user->setFirstName(ucfirst($user->getFirstName()));
            $user->setLastName(ucfirst($user->getLastName()));

            $password = $form->get('new_password')->getData();
            $user->setPassword($passwordHasher->hashPassword($user, $password));

            $user->setUpdatedAt(new DateTimeImmutable());
            $user->setIsVerified(true);

            $avatarFile = $form->get('avatarFile')->getData();

            if ($avatarFile) {
                $extension = $avatarFile->guessExtension();
                if (!in_array($extension, ['jpg', 'jpeg', 'png'])) {
                    $this->addFlash('danger', 'Format d\'image non supporté');
                }

                $filename = $user->getId() . '-' . uniqid() . '.' . $extension;
                $filepath = $this->getParameter('uploads_user_directory') . '/' . $filename;

                try {
                    $avatarFile->move(
                        $this->getParameter('uploads_user_directory'),
                        $filename
                    );
                } catch (FileException $e) {
                    $this->addFlash('danger', 'Une erreur est survenue lors de l\'upload de l\'image');
                }

                list($width, $height) = getimagesize($filepath);
                $size = min($width, $height); // get the minimum dimension
                $dst_x = ($width - $size) / 2;
                $dst_y = ($height - $size) / 2;
                $src_x = 0;
                $src_y = 0;
                $new_width = $new_height = 80;

                if ($extension === 'png') {
                    $image = imagecreatefrompng($filepath);
                } else {
                    $image = imagecreatefromjpeg($filepath);
                }

                $new_image = imagecreatetruecolor($new_width, $new_height);
                imagecopyresampled($new_image, $image, 0, 0, $src_x + $dst_x, $src_y + $dst_y, $new_width, $new_height, $size, $size);

                if ($extension === 'png') {
                    imagepng($new_image, $filepath);
                } else {
                    imagejpeg($new_image, $filepath);
                }

                imagedestroy($image);
                imagedestroy($new_image);

                $user->setAvatar($this->getParameter('uploads_user_url') . $filename);
            }

            $userRepository->add($user, true);

            $this->addFlash(
                'success',
                'Votre profil a bien été créé.'
            );

            return $this->redirectToRoute('app_backoffice_home', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('user/create.html.twig', [
            'user' => $user,
            'form' => $form,
        ]);
    }

    /**
     * @Route("/back_office/utilisateurs/{id}/modifier", name="app_backoffice_users_edit", requirements={"id":"\d+"}, methods={"GET", "POST"})
     */
    public function edit(Request $request, User $user, UserRepository $userRepository): Response
    {
        $this->denyAccessUnlessGranted('user_update', $user);

        $form = $this->createForm(UserType::class, $user);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {

            $avatarFile = $form->get('avatarFile')->getData();

            if ($avatarFile) {
                $extension = $avatarFile->guessExtension();
                if (!in_array($extension, ['jpg', 'jpeg', 'png'])) {
                    $this->addFlash('danger', 'Format d\'image non supporté');
                    // return $this->redirectToRoute('app_backoffice_users_new');
                }

                $filename = $user->getId() . '-' . uniqid() . '.' . $extension;
                $filepath = $this->getParameter('uploads_user_directory') . '/' . $filename;

                try {
                    $avatarFile->move(
                        $this->getParameter('uploads_user_directory'),
                        $filename
                    );
                } catch (FileException $e) {
                    $this->addFlash('danger', 'Une erreur est survenue lors de l\'upload de l\'image');
                    // return $this->redirectToRoute('app_backoffice_users_new');
                }

                list($width, $height) = getimagesize($filepath);
                $size = min($width, $height); // get the minimum dimension
                $dst_x = ($width - $size) / 2;
                $dst_y = ($height - $size) / 2;
                $src_x = 0;
                $src_y = 0;
                $new_width = $new_height = 80;

                if ($extension === 'png') {
                    $image = imagecreatefrompng($filepath);
                } else {
                    $image = imagecreatefromjpeg($filepath);
                }

                $new_image = imagecreatetruecolor($new_width, $new_height);
                imagecopyresampled($new_image, $image, 0, 0, $src_x + $dst_x, $src_y + $dst_y, $new_width, $new_height, $size, $size);

                if ($extension === 'png') {
                    imagepng($new_image, $filepath);
                } else {
                    imagejpeg($new_image, $filepath);
                }

                imagedestroy($image);
                imagedestroy($new_image);

                $user->setAvatar($this->getParameter('uploads_user_url') . $filename);
            }
            $user->setUpdatedAt(new DateTimeImmutable());
            $userRepository->add($user, true);

            if ($this->getUser()->getId() === $user->getId()) {
                $this->addFlash(
                    'success',
                    'Votre profil a bien été modifié.'
                );
                return $this->redirectToRoute('app_backoffice_home', [], Response::HTTP_SEE_OTHER);
            }

            $this->addFlash(
                'success',
                'Le profil de ' . $user->getFirstname() . ' ' . $user->getLastname() . ' a bien été modifié.'
            );
            return $this->redirectToRoute('app_backoffice_authors_list', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('user/edit.html.twig', [
            'user' => $user,
            'form' => $form,
        ]);
    }

    /**
     * @Route("/back_office/utilisateurs/{id}/desactiver", name="app_backoffice_users_deactivate", requirements={"id":"\d+"}, methods={"POST"})
     */
    public function deactivate(Request $request, User $user, UserRepository $userRepository): Response
    {
        if ($this->isCsrfTokenValid('deactivate' . $user->getId(), $request->request->get('_token'))) {
            $user->setIsActive(false);
            $user->setUpdatedAt(new DateTimeImmutable());
            $userRepository->add($user, true);
        }
        $this->addFlash(
            'danger',
            'Le profil de ' . $user->getFirstname() . ' ' . $user->getLastname() . ' a bien été désactivé.'
        );

        if (in_array('ROLE_AUTHOR', $user->getRoles())) {
            return $this->redirectToRoute('app_backoffice_authors_list', [], Response::HTTP_SEE_OTHER);
        } else {
            return $this->redirectToRoute('app_backoffice_members_list', [], Response::HTTP_SEE_OTHER);
        }
    }

    /**
     * @Route("/back_office/utilisateurs/{id}/reactiver", name="app_backoffice_users_reactivate", requirements={"id":"\d+"}, methods={"POST"})
     */
    public function reactivate(Request $request, User $user, UserRepository $userRepository): Response
    {
        if ($this->isCsrfTokenValid('reactivate' . $user->getId(), $request->request->get('_token'))) {
            $user->setIsActive(true);
            $user->setUpdatedAt(new DateTimeImmutable());
            $userRepository->add($user, true);
        }
        $this->addFlash(
            'success',
            'Le profil de ' . $user->getFirstname() . ' ' . $user->getLastname() . ' a bien été réactivé.'
        );
        if (in_array('ROLE_AUTHOR', $user->getRoles())) {
            return $this->redirectToRoute('app_backoffice_authors_list', [], Response::HTTP_SEE_OTHER);
        } else {
            return $this->redirectToRoute('app_backoffice_members_list', [], Response::HTTP_SEE_OTHER);
        }
    }
}
