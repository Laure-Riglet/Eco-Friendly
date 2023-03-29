<?php

namespace App\DataFixtures;

use App\Entity\Advice;
use App\Entity\Answer;
use App\Entity\Article;
use App\Entity\Avatar;
use App\Entity\Category;
use App\Entity\Quiz;
use App\Entity\User;
use App\Service\GeneratorService;
use App\Service\SluggerService;
use DateTimeImmutable;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{
    private $passwordHasher;
    private $slugger;
    private $generator;

    public function __construct(SluggerService $slugger, UserPasswordHasherInterface $passwordHasher, GeneratorService $generator)
    {
        $this->passwordHasher = $passwordHasher;
        $this->slugger = $slugger;
        $this->generator = $generator;
    }
    public function load(ObjectManager $manager): void
    {
        // ! Instantiation of faker

        $faker = Faker\Factory::create();

        // ! Adding Categories

        $categories = [
            'Maison',
            'Santé',
            'Mobilité',
            'Alimentation',
        ];

        foreach ($categories as $categoryName) {
            $category = new Category();
            $category->setName($categoryName);
            $category->setTagline($faker->sentence(6, true));
            $category->setSlug($this->slugger->slugify($categoryName));
            $category->setPicture('https://cdn.eco-friendly.fr/assets/img/categories/' . $this->slugger->slugify($categoryName) . '.webp');
            $category->setCreatedAt(new DateTimeImmutable());
            $category->setIsActive(true);
            $manager->persist($category);
        }

        $manager->flush();

        echo 'Categories added !' . PHP_EOL;

        // ! Adding Avatars

        $avatars = [
            'Ours' => 'https://cdn.eco-friendly.fr/assets/img/avatars/ours.png',
            'Mésange bleue' => 'https://cdn.eco-friendly.fr/assets/img/avatars/mesange-bleue.png',
            'Chevreuil' => 'https://cdn.eco-friendly.fr/assets/img/avatars/chevreuil.png',
            'Grenouille' => 'https://cdn.eco-friendly.fr/assets/img/avatars/grenouille.png',
            'Renard' => 'https://cdn.eco-friendly.fr/assets/img/avatars/renard.png',
            'Lièvre' => 'https://cdn.eco-friendly.fr/assets/img/avatars/lievre.png',
            'Papillon' => 'https://cdn.eco-friendly.fr/assets/img/avatars/papillon.png',
        ];

        foreach ($avatars as $name => $picture) {
            $avatar = new Avatar();
            $avatar->setName($name);
            $avatar->setPicture($picture);
            $avatar->setIsActive(true);
            $avatar->setCreatedAt(new DateTimeImmutable());
            $manager->persist($avatar);
        }

        $manager->flush();

        echo 'Avatars added !' . PHP_EOL;

        // ! Adding Users

        $passwordHasher = $this->passwordHasher;

        $user = new User();
        $user->setEmail('admin@admin.com');
        $user->setRoles(['ROLE_ADMIN']);
        $user->setPassword($passwordHasher->hashPassword($user, 'admin'));
        $user->setFirstname('Admin');
        $user->setLastname('Istrateur');
        $user->setNickname('NoSysAdmin');
        $user->setCode($this->generator->codeGen());
        $user->setAvatar($avatars[array_rand($avatars)]);
        $user->setIsActive(1);
        $user->setIsVerified(1);
        $user->setCreatedAt(DateTimeImmutable::createFromMutable($faker->dateTimeBetween('-1 years', 'now')));
        $user->setUpdatedAt(DateTimeImmutable::createFromMutable($faker->dateTimeBetween('-1 years', 'now')));
        $manager->persist($user);

        $user = new User();
        $user->setEmail('camille.lambrecq@eco-friendly.fr');
        $user->setRoles(['ROLE_AUTHOR']);
        $user->setPassword($passwordHasher->hashPassword($user, 'L@mbr3cq'));
        $user->setFirstname('Camille');
        $user->setLastname('Lambrecq');
        $user->setNickname('CamLam');
        $user->setCode($this->generator->codeGen());
        $user->setAvatar($avatars[array_rand($avatars)]);
        $user->setIsActive(1);
        $user->setIsVerified(1);
        $user->setCreatedAt(DateTimeImmutable::createFromMutable($faker->dateTimeBetween('-1 years', 'now')));
        $user->setUpdatedAt(DateTimeImmutable::createFromMutable($faker->dateTimeBetween('-1 years', 'now')));
        $manager->persist($user);

        $user = new User();
        $user->setEmail('alban.care@gmail.com');
        $user->setRoles(['ROLE_USER']);
        $user->setPassword($passwordHasher->hashPassword($user, '@lb@nC@r3'));
        $user->setFirstname('Alban');
        $user->setLastname('Caré');
        $user->setNickname('Acare');
        $user->setCode($this->generator->codeGen());
        $user->setAvatar($avatars[array_rand($avatars)]);
        $user->setIsActive(1);
        $user->setIsVerified(1);
        $user->setCreatedAt(DateTimeImmutable::createFromMutable($faker->dateTimeBetween('-1 years', 'now')));
        $user->setUpdatedAt(DateTimeImmutable::createFromMutable($faker->dateTimeBetween('-1 years', 'now')));
        $manager->persist($user);

        for ($index = 0; $index < 8; $index++) {
            $user = new User();
            $user->setEmail($faker->email);
            $user->setPassword($passwordHasher->hashPassword($user, $faker->password));
            $user->setRoles(['ROLE_AUTHOR']);
            $user->setPassword($passwordHasher->hashPassword($user, $faker->password(8, 12)));
            $user->setFirstname($faker->firstName());
            $user->setLastname($faker->lastName());
            $user->setNickname($faker->userName());
            $user->setCode($this->generator->codeGen());
            $user->setAvatar($avatars[array_rand($avatars)]);
            $user->setIsActive(1);
            $user->setIsVerified(1);
            $user->setCreatedAt(DateTimeImmutable::createFromMutable($faker->dateTimeBetween('-1 years', 'now')));
            $user->setUpdatedAt(DateTimeImmutable::createFromMutable($faker->dateTimeBetween('-1 years', 'now')));
            $manager->persist($user);
        }

        for ($index = 0; $index < 35; $index++) {
            $user = new User();
            $user->setEmail($faker->email);
            $user->setPassword($passwordHasher->hashPassword($user, $faker->password));
            $user->setRoles(['ROLE_USER']);
            $user->setPassword($passwordHasher->hashPassword($user, $faker->password(8, 12)));
            $user->setFirstname($faker->firstName());
            $user->setLastname($faker->lastName());
            $user->setNickname($faker->userName());
            $user->setCode($this->generator->codeGen());
            $user->setAvatar($avatars[array_rand($avatars)]);
            $user->setIsActive(1);
            $user->setIsVerified(1);
            $user->setCreatedAt(DateTimeImmutable::createFromMutable($faker->dateTimeBetween('-1 years', 'now')));
            $user->setUpdatedAt(DateTimeImmutable::createFromMutable($faker->dateTimeBetween('-1 years', 'now')));
            $manager->persist($user);
        }

        $manager->flush();

        echo 'Users added !' . PHP_EOL;

        // ! Catégories & Users list

        $categories = $manager->getRepository(Category::class)->findAll();

        $users = $manager->getRepository(User::class)->findAll();

        // ! Adding Articles

        $authors = array_filter($users, function ($user) {
            return in_array('ROLE_AUTHOR', $user->getRoles());
        });

        for ($index = 0; $index < 50; $index++) {
            $article = new Article();
            $article->setTitle($faker->sentence(3, true));
            $article->setContent("<p><em>" . $faker->paragraph(6, true) . "</em></p><h3>" . $faker->sentence(6, true) . "</h3><p>" . $faker->paragraph(6, true) . "</p><p><b>" . $faker->paragraph(6, true) . "</b></p><p>" . $faker->paragraph(6, true) . "</p><h4>" . $faker->sentence(6, true) . "</h4><ul><li>" . $faker->sentence(6, true) . "</li><li>" . $faker->sentence(6, true) . "</li><li>" . $faker->sentence(6, true) . "</li></ul><h3>" . $faker->sentence(6, true) . "</h3><p>" . $faker->paragraph(6, true) . "</p><p>" . $faker->paragraph(6, true) . "</p><p>" . $faker->paragraph(6, true) . "</p><p><em>" . $faker->paragraph(6, true) . "</em></p>");
            $article->setSlug($this->slugger->slugify($article->getTitle()));
            $article->setPicture('https://picsum.photos/id/' . $faker->numberBetween(1, 200) . '/1000/1000.jpg');
            $article->setStatus($faker->numberBetween(0, 2));
            $article->setAuthor($authors[array_rand($authors)]);
            $article->setCategory($categories[$faker->numberBetween(0, count($categories) - 1)]);
            $article->setCreatedAt(DateTimeImmutable::createFromMutable($faker->dateTimeBetween('-1 years', 'now')));
            $article->setUpdatedAt(DateTimeImmutable::createFromMutable($faker->dateTimeBetween('-1 years', 'now')));
            $manager->persist($article);
        }

        $manager->flush();

        for ($index = 0; $index < 50; $index++) {
            $article = new Article();
            $article->setTitle($faker->sentence(3, true));
            $article->setContent("<p><em>" . $faker->paragraph(6, true) . "</em></p><h3>" . $faker->sentence(6, true) . "</h3><p>" . $faker->paragraph(6, true) . "</p><p><b>" . $faker->paragraph(6, true) . "</b></p><p>" . $faker->paragraph(6, true) . "</p><h4>" . $faker->sentence(6, true) . "</h4><ul><li>" . $faker->sentence(6, true) . "</li><li>" . $faker->sentence(6, true) . "</li><li>" . $faker->sentence(6, true) . "</li></ul><h3>" . $faker->sentence(6, true) . "</h3><p>" . $faker->paragraph(6, true) . "</p><p>" . $faker->paragraph(6, true) . "</p><p>" . $faker->paragraph(6, true) . "</p><p><em>" . $faker->paragraph(6, true) . "</em></p>");
            $article->setSlug($this->slugger->slugify($article->getTitle()));
            $article->setPicture('https://picsum.photos/id/' . $faker->numberBetween(1, 200) . '/1000/1000.jpg');
            $article->setStatus(1);
            $article->setAuthor($authors[array_rand($authors)]);
            $article->setCategory($categories[$faker->numberBetween(0, count($categories) - 1)]);
            $article->setCreatedAt(DateTimeImmutable::createFromMutable($faker->dateTimeBetween('-1 years', 'now')));
            $article->setUpdatedAt(DateTimeImmutable::createFromMutable($faker->dateTimeBetween('-1 years', 'now')));
            $manager->persist($article);
        }

        $manager->flush();

        echo 'Articles added !' . PHP_EOL;

        // ! Adding Quizzes & Answers

        $articles = $manager->getRepository(Article::class)->findAll();
        $trueOrFalse = [1, 0, 0, 0];

        foreach ($articles as $article) {
            $quiz = new Quiz();
            $quiz->setQuestion(substr_replace($faker->sentence(rand(8, 15), true), " ?", -1));
            $quiz->setArticle($article);
            $quiz->setStatus(1);
            $quiz->setCreatedAt(DateTimeImmutable::createFromMutable($faker->dateTimeBetween('-1 years', 'now')));
            $quiz->setUpdatedAt(DateTimeImmutable::createFromMutable($faker->dateTimeBetween('-1 years', 'now')));
            $manager->persist($quiz);
            shuffle($trueOrFalse);
            for ($index = 0; $index < 4; $index++) {
                $answer = new Answer();
                $answer->setContent($faker->sentence(rand(4, 10), true));
                $answer->setQuiz($quiz);
                $answer->setCorrect($trueOrFalse[$index]);
                $manager->persist($answer);
            }
        }

        $manager->flush();
        echo 'Quizzes and their answers added !' . PHP_EOL;

        // ! Adding Advices

        $contributors = array_filter($users, function ($user) {
            return !in_array('ROLE_AUTHOR', $user->getRoles()) && !in_array('ROLE_ADMIN', $user->getRoles());
        });

        for ($index = 0; $index < 70; $index++) {
            $advice = new Advice();
            $advice->setTitle($faker->sentence(3, true));
            $advice->setContent("<p>" . $faker->paragraph(6, true) . "</p><p>" . $faker->paragraph(6, true) . "</p><p>" . $faker->paragraph(6, true) . "</p>");
            $advice->setSlug($this->slugger->slugify($advice->getTitle()));
            $advice->setStatus($faker->numberBetween(0, 2));
            $advice->setContributor($contributors[array_rand($contributors)]);
            $advice->setCategory($categories[$faker->numberBetween(0, count($categories) - 1)]);
            $advice->setCreatedAt(DateTimeImmutable::createFromMutable($faker->dateTimeBetween('-1 years', 'now')));
            $advice->setUpdatedAt(DateTimeImmutable::createFromMutable($faker->dateTimeBetween('-1 years', 'now')));
            $manager->persist($advice);
        }

        $manager->flush();

        for ($index = 0; $index < 70; $index++) {
            $advice = new Advice();
            $advice->setTitle($faker->sentence(3, true));
            $advice->setContent("<p>" . $faker->paragraph(6, true) . "</p><p>" . $faker->paragraph(6, true) . "</p><p>" . $faker->paragraph(6, true) . "</p>");
            $advice->setSlug($this->slugger->slugify($advice->getTitle()));
            $advice->setStatus(1);
            $advice->setContributor($contributors[array_rand($contributors)]);
            $advice->setCategory($categories[$faker->numberBetween(0, count($categories) - 1)]);
            $advice->setCreatedAt(DateTimeImmutable::createFromMutable($faker->dateTimeBetween('-1 years', 'now')));
            $advice->setUpdatedAt(DateTimeImmutable::createFromMutable($faker->dateTimeBetween('-1 years', 'now')));
            $manager->persist($advice);
        }

        $manager->flush();

        echo 'Advices added !' . PHP_EOL;

        // ! Adding items to test the 3 custom terminal commands

        // ! Adding Articles to test the articles illustration images dead links removal command

        for ($index = 0; $index < 5; $index++) {
            $article = new Article();
            $article->setTitle($faker->sentence(3, true));
            $article->setContent("<p><em>" . $faker->paragraph(6, true) . "</em></p><h3>" . $faker->sentence(6, true) . "</h3><p>" . $faker->paragraph(6, true) . "</p><p><b>" . $faker->paragraph(6, true) . "</b></p><p>" . $faker->paragraph(6, true) . "</p><h4>" . $faker->sentence(6, true) . "</h4><ul><li>" . $faker->sentence(6, true) . "</li><li>" . $faker->sentence(6, true) . "</li><li>" . $faker->sentence(6, true) . "</li></ul><h3>" . $faker->sentence(6, true) . "</h3><p>" . $faker->paragraph(6, true) . "</p><p>" . $faker->paragraph(6, true) . "</p><p>" . $faker->paragraph(6, true) . "</p><p><em>" . $faker->paragraph(6, true) . "</em></p>");
            $article->setSlug($this->slugger->slugify($article->getTitle()));
            $article->setPicture('broken.jpg');
            $article->setStatus(0);
            $article->setAuthor($authors[array_rand($authors)]);
            $article->setCategory($categories[$faker->numberBetween(0, count($categories) - 1)]);
            $article->setCreatedAt(DateTimeImmutable::createFromMutable($faker->dateTimeBetween('-1 years', 'now')));
            $article->setUpdatedAt(DateTimeImmutable::createFromMutable($faker->dateTimeBetween('-1 years', 'now')));
            $manager->persist($article);
        }

        // ! Adding Users to test the unverified users removal command

        for ($index = 0; $index < 5; $index++) {
            $user = new User();
            $user->setEmail($faker->email);
            $user->setPassword($passwordHasher->hashPassword($user, $faker->password));
            $user->setRoles(['ROLE_USER']);
            $user->setPassword($passwordHasher->hashPassword($user, $faker->password(8, 12)));
            $user->setFirstname($faker->firstName());
            $user->setLastname($faker->lastName());
            $user->setNickname($faker->userName());
            $user->setCode($this->generator->codeGen());
            $user->setAvatar($avatars[array_rand($avatars)]);
            $user->setIsActive(1);
            $user->setIsVerified(0);
            $user->setCreatedAt(DateTimeImmutable::createFromMutable($faker->dateTimeBetween('-1 years', 'now')));
            $manager->persist($user);
        }

        // ! Adding Users to test the avatar dead links removal command

        for ($index = 0; $index < 5; $index++) {
            $user = new User();
            $user->setEmail($faker->email);
            $user->setPassword($passwordHasher->hashPassword($user, $faker->password));
            $user->setRoles(['ROLE_USER']);
            $user->setPassword($passwordHasher->hashPassword($user, $faker->password(8, 12)));
            $user->setFirstname($faker->firstName());
            $user->setLastname($faker->lastName());
            $user->setNickname($faker->userName());
            $user->setCode($this->generator->codeGen());
            $user->setAvatar('broken.jpg');
            $user->setIsActive(1);
            $user->setIsVerified(1);
            $user->setCreatedAt(DateTimeImmutable::createFromMutable($faker->dateTimeBetween('-1 years', 'now')));
            $manager->persist($user);
        }

        $manager->flush();

        echo 'Commands test items added !' . PHP_EOL;

        echo 'All done !' . PHP_EOL;
    }
}
