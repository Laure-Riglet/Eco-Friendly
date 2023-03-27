<?php

namespace App\Form;

use App\Entity\Quiz;
use App\Validator\Quiz as ValidatorQuiz;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class QuizType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('question', TextType::class, [
                'label' => 'Question'
            ])
            ->add('answers', CollectionType::class, [
                'entry_type' => AnswerType::class,
                'entry_options' => ['label' => false],
                'by_reference' => false,
                'label' => 'Réponses',
                'error_bubbling' => false
            ])
            ->add('status', ChoiceType::class, [
                'choices' => [
                    'Brouillon' => 0,
                    'Publié' => 1
                ],
                'label' => 'Statut'
            ]);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Quiz::class,
            'constraints' => new ValidatorQuiz()
        ]);
    }
}
