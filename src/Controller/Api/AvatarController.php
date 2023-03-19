<?php

namespace App\Controller\Api;

use App\Repository\AvatarRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AvatarController extends AbstractController
{
    /**
     * @Route("/v2/avatars", name="api_avatars_list", host="api.eco-friendly.localhost")
     */
    public function list(AvatarRepository $avatarRepository): Response
    {
        return $this->json($avatarRepository->findAll(), Response::HTTP_OK);
    }
}
