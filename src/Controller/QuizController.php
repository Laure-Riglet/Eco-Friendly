<?php

namespace App\Controller;

use App\Entity\Answer;
use App\Entity\Article;
use App\Entity\Quiz;
use App\Form\QuizType;
use App\Repository\AnswerRepository;
use App\Repository\QuizRepository;
use DateTimeImmutable;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
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

        $answer1 = new Answer();
        $answer1->setQuiz($quiz);
        $quiz->getAnswers()->add($answer1);
        $answer2 = new Answer();
        $answer2->setQuiz($quiz);
        $quiz->getAnswers()->add($answer2);
        $answer3 = new Answer();
        $answer3->setQuiz($quiz);
        $quiz->getAnswers()->add($answer3);
        $answer4 = new Answer();
        $answer4->setQuiz($quiz);
        $quiz->getAnswers()->add($answer4);

        $form = $this->createForm(QuizType::class, $quiz);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
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
     * @Route("/articles/{id}/quiz/{quiz_id}/editer", name="bo_quizzes_edit", requirements={"id":"\d+"}, methods={"GET", "POST"})
     * @ParamConverter("quiz", class="App\Entity\Quiz", options={"id" = "quiz_id"})
     */
    public function edit(Request $request, Article $article, Quiz $quiz, QuizRepository $quizRepository, AnswerRepository $answerRepository): Response
    {
        $form = $this->createForm(QuizType::class, $quiz);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {

            $quizRepository->add($quiz, true);

            $this->addFlash(
                'success',
                'Le quiz "' . $quiz->getQuestion() . '" a bien été modifié.'
            );

            return $this->redirectToRoute('bo_articles_show', ['id' => $article->getId()], Response::HTTP_SEE_OTHER);
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
            $quiz->setStatus(2);
            $quiz->setUpdatedAt(new DateTimeImmutable());
            $quizRepository->add($quiz, true);
        }

        $this->addFlash(
            'danger',
            'Le quiz "' . $quiz->getQuestion() . '" a bien été désactivé.'
        );
        return $this->redirectToRoute('bo_articles_show', ['id' => $quiz->getArticle()->getId()], Response::HTTP_SEE_OTHER);
    }

    /**
     * @Route("/quiz/{id}/reactiver", name="bo_quizzes_reactivate", requirements={"id":"\d+"}, methods={"POST"})
     
     */
    public function reactivate(Request $request, Quiz $quiz, QuizRepository $quizRepository): Response
    {
        if ($this->isCsrfTokenValid('reactivate' . $quiz->getId(), $request->request->get('_token'))) {
            $quiz->setStatus(1);
            $quiz->setUpdatedAt(new DateTimeImmutable());
            $quizRepository->add($quiz, true);
        }
        $this->addFlash(
            'success',
            'Le quiz "' . $quiz->getQuestion() . '" a bien été réactivé.'
        );

        return $this->redirectToRoute('bo_articles_show', ['id' => $quiz->getArticle()->getId()], Response::HTTP_SEE_OTHER);
    }
}
