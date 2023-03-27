<?php

namespace App\Form;

use App\Entity\Article;
use App\Entity\Quiz;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
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
            ->add('status', ChoiceType::class, [
                'choices' => [
                    'Brouillon' => 0,
                    'Publié' => 1
                ],
                'label' => 'Statut'
            ])
            ->add('answer1', TextType::class, [
                'label' => 'Réponse 1 *',
                'mapped' => false,
                'help' => '* obligatoire'
            ])
            ->add('answer2', TextType::class, [
                'label' => 'Réponse 2 *',
                'mapped' => false,
                'help' => '* obligatoire'
            ])
            ->add('answer3', TextType::class, [
                'label' => 'Réponse 3',
                'mapped' => false
            ])
            ->add('answer4', TextType::class, [
                'label' => 'Réponse 4',
                'mapped' => false
            ])
            ->add('correct_answer', ChoiceType::class, [
                'choices' => [
                    'Réponse 1' => 1,
                    'Réponse 2' => 2,
                    'Réponse 3' => 3,
                    'Réponse 4' => 4
                ],
                'label' => 'Réponse correcte',
                'mapped' => false,
                'multiple' => false,
                'expanded' => true
            ]);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Quiz::class,
        ]);
    }
}
