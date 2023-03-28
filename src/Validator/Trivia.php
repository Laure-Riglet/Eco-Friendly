<?php

namespace App\Validator;

use Symfony\Component\Validator\Constraint;

/**
 * @Annotation
 */
class Trivia extends Constraint
{
    public string $questionIsEmpty = 'Veuillez renseigner la question';

    public string $answersIsEmpty = 'Veuillez renseigner toutes les réponses';

    public string $noCorrectAnswer = 'Veuillez renseigner une bonne réponse';

    public string $tooManyCorrectAnswers = 'Veuillez ne renseigner qu\'une seule bonne réponse';

    public string $duplicateAnswers = 'Chaque réponse doit être unique';

    public function getTargets(): string
    {
        return self::CLASS_CONSTRAINT;
    }
}
