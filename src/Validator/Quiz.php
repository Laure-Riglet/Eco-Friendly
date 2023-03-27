<?php

namespace App\Validator;

use Symfony\Component\Validator\Constraint;

class Quiz extends Constraint
{
    public string $questionIsEmpty = 'Veuillez renseigner la question';

    public string $answersIsEmpty = 'Veuillez renseigner toutes les réponses';

    public string $noCorrectAnswer = 'Veuillez renseigner une bonne réponse';

    public string $tooManyCorrectAnswers = 'Veuillez ne renseigner qu\'une seule bonne réponse';

    public string $duplicateAnswers = 'Chaque réponse doit être unique';

    public string $statusIsEmpty = 'Veuillez renseigner le statut';

    public function getTargets(): string
    {
        return self::CLASS_CONSTRAINT;
    }
}
