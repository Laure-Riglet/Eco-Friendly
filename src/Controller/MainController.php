<?php

namespace App\Controller;

use App\Entity\Advice;
use App\Entity\Article;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;


class MainController extends AbstractController
{
    /**
     * @Route("/", name="api_root", methods={"GET"}, host="api.eco-friendly.localhost")
     */
    public function apiRoot(): Response
    {
        return $this->redirect('https://www.eco-friendly.fr');
    }

    /**
     * @Route("/v2", name="api_root_v2", methods={"GET"}, host="api.eco-friendly.localhost")
     */
    public function apiRootv2(): Response
    {
        return $this->json([
            'message' => 'Welcome to the Eco-Friendly API',
            // 'documentation' => 'https://documenter.getpostman.com/view/13200091/Tz5qZ9Zu',
        ]);
    }

    /**
     * @Route("/", name="bo_root", methods={"GET"}, host="backoffice.eco-friendly.localhost")
     */
    public function boRoot(): Response
    {
        return $this->redirectToRoute('bo_home');
    }


    /**
     * @Route("/home", name="bo_home", methods={"GET"}, host="backoffice.eco-friendly.localhost")
     */
    public function home(EntityManagerInterface $entityManager): Response
    {
        if (!$this->getUser() || !$this->getUser()->isActive()) {
            return $this->redirectToRoute('bo_security_login');
        } else if (!$this->getUser()->isVerified()) {
            return $this->redirectToRoute('bo_users_create', ['id' => $this->getUser()->getId()]);
        } else if (in_array('ROLE_ADMIN', $this->getUser()->getRoles())) {
            return $this->render('home/admin.html.twig', [
                'user' => $this->getUser(),
                'members' => $entityManager->getRepository(User::class)->findMembersForHome(),
                'authors' => $entityManager->getRepository(User::class)->findAuthorsForHome(),
                'articles' => $entityManager->getRepository(Article::class)->findForHome(),
                'advices' => $entityManager->getRepository(Advice::class)->findForHome(),
            ]);
        } else {
            return $this->render('user/show.html.twig', [
                'user' => $this->getUser(),
                'articles' => $entityManager->getRepository(Article::class)->findAllByUser($this->getUser()),
            ]);
        }
    }
}
