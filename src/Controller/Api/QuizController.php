<?php

namespace App\Controller\Api;

use App\Repository\QuizRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route(host="api.eco-friendly.fr")
 */
class QuizController extends AbstractController
{
    /**
     * @Route("/v2/quizzes/random", name="api_quizzes_random", methods={"GET"})
     */
    public function list(QuizRepository $quizRepository): Response
    {
        return $this->json($quizRepository->findRandom(), Response::HTTP_OK, [], ['groups' => 'quizzes']);
    }
}
