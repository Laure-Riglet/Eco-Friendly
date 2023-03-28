<?php

namespace App\Entity;

use App\Repository\AnswerRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=AnswerRepository::class)
 */
class Answer
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"quizzes"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"quizzes"})
     * @assert\NotBlank
     * @assert\Length(min=3, max=255)
     */
    private $content;

    /**
     * @ORM\ManyToOne(targetEntity=Quiz::class, inversedBy="answers")
     * @ORM\JoinColumn(nullable=false)
     * @assert\NotBlank
     */
    private $quiz;

    /**
     * @ORM\Column(type="boolean")
     * @assert\NotBlank
     * @assert\Type("bool")
     * @Groups({"quizzes"})
     */
    private $correct;

    public function __toString()
    {
        return $this->content;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): self
    {
        $this->content = $content;

        return $this;
    }

    public function getQuiz(): ?Quiz
    {
        return $this->quiz;
    }

    public function setQuiz(?Quiz $quiz): self
    {
        $this->quiz = $quiz;

        return $this;
    }

    public function isCorrect(): ?bool
    {
        return $this->correct;
    }

    public function setCorrect(bool $correct): self
    {
        $this->correct = $correct;

        return $this;
    }
}
