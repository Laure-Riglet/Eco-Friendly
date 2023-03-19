<?php

namespace App\Controller;

use App\Entity\Avatar;
use App\Form\AvatarType;
use App\Repository\AvatarRepository;
use App\Service\SluggerService;
use DateTimeImmutable;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AvatarController extends AbstractController
{
    /**
     * @Route("/avatars", name="bo_avatars_list", methods={"GET"}, host="backoffice.eco-friendly.localhost")
     */
    public function list(AvatarRepository $avatarRepository): Response
    {
        return $this->render('avatar/list.html.twig', [
            'avatars' => $avatarRepository->findAll(),
        ]);
    }

    /**
     * @Route("/avatars/ajouter", name="bo_avatars_new", methods={"GET", "POST"}, host="backoffice.eco-friendly.localhost")
     */
    public function new(Request $request, SluggerService $slugger, AvatarRepository $avatarRepository): Response
    {
        $avatar = new Avatar();
        $avatar->setCreatedAt(new DateTimeImmutable());
        $form = $this->createForm(AvatarType::class, $avatar);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {

            $picture = $form->get('picture')->getData();
            if ($picture) {
                $pictureName = $slugger->slugify($avatar->getName()) . '.' . $picture->guessExtension();

                try {
                    $picture->move(
                        $this->getParameter('assets_avatar_directory'),
                        $pictureName
                    );
                    $avatar->setPicture($this->getParameter('assets_avatar_url') . $pictureName);
                } catch (FileException $e) {
                    $this->addFlash('danger', 'Une erreur est survenue lors de l\'upload de l\'image');
                }
            }

            $avatarRepository->add($avatar, true);

            $this->addFlash(
                'success',
                '"' . $avatar->getName() . '" a bien été ajouté.'
            );
            return $this->redirectToRoute('bo_avatars_list', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('avatar/new.html.twig', [
            'avatar' => $avatar,
            'form' => $form,
        ]);
    }

    /**
     * @Route("/avatars/{id}", name="bo_avatars_show", requirements={"id":"\d+"}, methods={"GET"}, host="backoffice.eco-friendly.localhost")
     */
    public function show(Avatar $avatar): Response
    {
        return $this->render('avatar/show.html.twig', [
            'avatar' => $avatar,
        ]);
    }

    /**
     * @Route("/avatars/{id}/modifier", name="bo_avatars_edit", requirements={"id":"\d+"}, methods={"GET", "POST"}, host="backoffice.eco-friendly.localhost")
     */
    public function edit(Request $request, SluggerService $slugger, Avatar $avatar, AvatarRepository $avatarRepository): Response
    {
        $form = $this->createForm(AvatarType::class, $avatar);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {

            $avatar->setUpdatedAt(new DateTimeImmutable());

            $picture = $form->get('picture')->getData();
            if ($picture) {
                $pictureName = $slugger->slugify($avatar->getName()) . '.' . $picture->guessExtension();

                try {
                    $picture->move(
                        $this->getParameter('assets_avatar_directory'),
                        $pictureName
                    );
                    $avatar->setPicture($this->getParameter('assets_avatar_url') . $pictureName);
                } catch (FileException $e) {
                    $this->addFlash('danger', 'Une erreur est survenue lors de l\'upload de l\'image');
                }
            }

            $avatarRepository->add($avatar, true);
            $this->addFlash(
                'success',
                '"' . $avatar->getName() . '" a bien été modifié'
            );
            return $this->redirectToRoute('bo_avatars_list', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('avatar/edit.html.twig', [
            'avatar' => $avatar,
            'form' => $form,
        ]);
    }

    /**
     * @Route("/avatars/{id}/desactiver", name="bo_avatars_deactivate", requirements={"id":"\d+"}, methods={"POST"}, host="backoffice.eco-friendly.localhost")
     */
    public function deactivate(Request $request, Avatar $avatar, AvatarRepository $avatarRepository): Response
    {
        if ($this->isCsrfTokenValid('deactivate' . $avatar->getId(), $request->request->get('_token'))) {
            $avatar->setIsActive(false);
            $avatar->setUpdatedAt(new DateTimeImmutable());
            $avatarRepository->add($avatar, true);
        }
        $this->addFlash(
            'danger',
            '"' . $avatar->getName() . '" a été désactivé.'
        );
        return $this->redirectToRoute('bo_avatars_list', [], Response::HTTP_SEE_OTHER);
    }

    /**
     * @Route("/avatars/{id}/reactiver", name="bo_avatars_reactivate", requirements={"id":"\d+"}, methods={"POST"}, host="backoffice.eco-friendly.localhost")
     */
    public function reactivate(Request $request, Avatar $avatar, AvatarRepository $avatarRepository): Response
    {
        if ($this->isCsrfTokenValid('reactivate' . $avatar->getId(), $request->request->get('_token'))) {
            $avatar->setIsActive(true);
            $avatar->setUpdatedAt(new DateTimeImmutable());
            $avatarRepository->add($avatar, true);
        }
        $this->addFlash(
            'success',
            '"' . $avatar->getName() . '" a été activé.'
        );
        return $this->redirectToRoute('bo_avatars_list', [], Response::HTTP_SEE_OTHER);
    }
}
