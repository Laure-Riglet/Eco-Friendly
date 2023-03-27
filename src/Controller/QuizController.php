<?php

namespace App\Controller;

use App\Entity\Article;
use App\Entity\Quiz;
use App\Form\QuizType;
use App\Repository\QuizRepository;
use App\Service\SluggerService;
use DateTimeImmutable;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route(host="backoffice.eco-friendly.localhost")
 */
class QuizController extends AbstractController
{
    /**
     * @Route("/quiz", name="bo_quizzes_list", methods={"GET"})
     */
    public function list(QuizRepository $quizRepository): Response
    {
        return $this->render('quiz/list.html.twig', [
            'quizzes' => $quizRepository->findAll(),
        ]);
    }

    /**
     * @Route("/articles/{id}/quiz/ajouter", name="bo_quizzes_new", requirements={"id":"\d+"}, methods={"GET", "POST"})
     */
    public function new(Request $request, Article $article, QuizRepository $quizRepository): Response
    {
        $quiz = new Quiz();
        $quiz->setArticle($article);
        $form = $this->createForm(QuizType::class, $quiz);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $answer1 = $form->get('answer1')->getData();
            $answer2 = $form->get('answer2')->getData();
            $answer3 = $form->get('answer3')->getData();
            $answer4 = $form->get('answer4')->getData();

            $quiz->setCreatedAt(new DateTimeImmutable());
            $quizRepository->add($quiz, true);

            $this->addFlash(
                'success',
                'Le quiz "' . $quiz->getQuestion() . '" a bien été ajouté.'
            );

            return $this->redirectToRoute('bo_articles_show', ['id' => $article->getId()], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('quiz/new.html.twig', [
            'quiz' => $quiz,
            'form' => $form,
        ]);
    }

    /**
     * @Route("/quiz/{id}", name="bo_quizzes_show", requirements={"id":"\d+"}, methods={"GET"})
     */
    public function show(Quiz $quiz): Response
    {
        return $this->render('quiz/show.html.twig', [
            'quiz' => $quiz
        ]);
    }

    /**
     * @Route("/quiz/{id}/editer", name="bo_quizzes_edit", requirements={"id":"\d+"}, methods={"GET", "POST"})
     */
    public function edit(Request $request, Quiz $quiz, QuizRepository $quizRepository): Response
    {
        $originalQuiz = clone $quiz;
        $form = $this->createForm(QuizType::class, $quiz);
        $quiz->setPicture($originalQuiz->getPicture());
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {

            $quiz->setSlug($slugger->slugify($quiz->getName()));
            $quiz->setUpdatedAt(new DateTimeImmutable());
            $quizRepository->add($quiz, true);
            $this->addFlash(
                'success',
                'Le quiz "' . $quiz->getName() . '" a bien été modifiée'
            );

            return $this->redirectToRoute('bo_quizzes_list', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('quiz/edit.html.twig', [
            'quiz' => $quiz,
            'form' => $form,
        ]);
    }

    /**
     * @Route("/quiz/{id}/desactiver", name="bo_quizzes_deactivate", requirements={"id":"\d+"}, methods={"POST"})
     */
    public function deactivate(Request $request, Quiz $quiz, QuizRepository $quizRepository): Response
    {
        if ($this->isCsrfTokenValid('deactivate' . $quiz->getId(), $request->request->get('_token'))) {
            $quiz->setIsActive(false);
            $quiz->setUpdatedAt(new DateTimeImmutable());
            $quizRepository->add($quiz, true);
        }

        $this->addFlash(
            'danger',
            'Le quiz "' . $quiz->getName() . '" a bien été désactivée.'
        );
        return $this->redirectToRoute('bo_quizzes_list', [], Response::HTTP_SEE_OTHER);
    }

    /**
     * @Route("/quiz/{id}/reactiver", name="bo_quizzes_reactivate", requirements={"id":"\d+"}, methods={"POST"})
     
     */
    public function reactivate(Request $request, Quiz $quiz, QuizRepository $quizRepository): Response
    {
        if ($this->isCsrfTokenValid('reactivate' . $quiz->getId(), $request->request->get('_token'))) {
            $quiz->setIsActive(true);
            $quiz->setUpdatedAt(new DateTimeImmutable());
            $quizRepository->add($quiz, true);
        }
        $this->addFlash(
            'success',
            'Le quiz "' . $quiz->getName() . '" a bien été réactivée.'
        );

        return $this->redirectToRoute('bo_quizzes_list', [], Response::HTTP_SEE_OTHER);
    }
}
