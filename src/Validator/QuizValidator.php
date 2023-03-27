<?php

namespace App\Validator;

use App\Entity\Quiz;
use App\Validator\Quiz as ValidatorQuiz;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;
use Symfony\Component\Validator\Exception\UnexpectedValueException;

class QuizValidator extends ConstraintValidator
{
    /**
     * @param Quiz $quiz
     */
    public function validate($quiz, Constraint $constraint): void
    {
        if (!$quiz instanceof Quiz) {
            throw new UnexpectedValueException($quiz, Quiz::class);
        }

        if (!$constraint instanceof ValidatorQuiz) {
            throw new UnexpectedValueException($constraint, ValidatorQuiz::class);
        }

        // Get the quiz data to validate
        $question = $quiz->getQuestion();
        $status = $quiz->getStatus();
        $answers = $quiz->getAnswers();

        // Check if the question is empty
        if (empty($question)) {
            $this->context->buildViolation($constraint->questionIsEmpty)
                ->atPath('question')
                ->addViolation();
        }

        // Count the number of empty answers if any
        $emptyAnswers = 0;

        foreach ($answers as $answer) {
            if (empty($answer->getContent())) {
                $emptyAnswers++;
            }
        }

        if ($emptyAnswers > 0) { // Check if one or more answers are empty
            $this->context->buildViolation($constraint->answersIsEmpty)
                ->atPath('answers')
                ->addViolation();
        } else { // Check if there are duplicate answers contents
            $contents = [];
            foreach ($answers as $answer) {
                $contents[] = $answer->getContent();
            }

            if (count($contents) !== 4) {
                $this->context->buildViolation($constraint->duplicateAnswers)
                    ->atPath('answers')
                    ->addViolation();
            }
        }

        // Count the number of correct answers
        $correctAnswersNb = 0;
        foreach ($answers as $answer) {
            if ($answer->IsCorrect()) {
                $correctAnswersNb++;
            }
        }

        // Check if there is no correct answer
        if ($correctAnswersNb === 0) {
            $this->context->buildViolation($constraint->noCorrectAnswer)
                ->atPath('answers')
                ->addViolation();
        }

        // Check if there is more than one correct answer
        if ($correctAnswersNb > 1) {
            $this->context->buildViolation($constraint->tooManyCorrectAnswers)
                ->atPath('answers')
                ->addViolation();
        }

        // Check if the status is empty
        if (empty($status)) {
            $this->context->buildViolation($constraint->statusIsEmpty)
                ->atPath('status')
                ->addViolation();
        }
    }
}
