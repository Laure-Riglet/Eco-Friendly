<?php

namespace App\Form;

use App\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\File;

class UserType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add("firstname", TextType::class, [
                "label" => "Prénom",
                "attr" => [
                    "placeholder" => "Entrez votre prénom"
                ]
            ])

            ->add("lastname", TextType::class, [
                "label" => "Nom",
                "attr" => [
                    "placeholder" => "Entrez votre nom de famille"
                ]
            ])

            ->add("nickname", TextType::class, [
                "label" => 'Pseudo',
                "attr" => [
                    "placeholder" => "Entrez votre pseudo"
                ]
            ])

            ->add('email', EmailType::class, [
                "label" => "Email",
                "attr" => [
                    "placeholder" => "Email"
                ]
            ])

            ->add('roles', ChoiceType::class, [
                "choices" => [
                    "Admin" =>  "ROLE_ADMIN",
                    "Auteur" => "ROLE_AUTHOR",
                    "Membre" => "ROLE_USER"
                ],
                "expanded" => true,
                "multiple" => true,
            ])

            ->add('avatar', FileType::class, [
                "label" => "Image d'illustration",
                "mapped" => false,
                "required" => false,
                "constraints" => [
                    new File([
                        "maxSize" => "2048k",
                        "mimeTypes" => [
                            "image/jpeg",
                            "image/png",
                            "image/gif",
                        ],
                        "mimeTypesMessage" => "Veuillez uploader une image valide",
                    ])
                ],
            ]);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => User::class,
        ]);
    }
}
