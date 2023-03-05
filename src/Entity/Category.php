<?php

namespace App\Entity;

use App\Repository\CategoryRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=CategoryRepository::class)
 */
class Category
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"articles"})
     * @Groups({"advices"})
     * @Groups({"users"})
     * @Groups({"categories"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=32)
     * @Assert\Length(min = 1, max = 32)
     * @Assert\NotBlank
     * @Groups({"articles"})
     * @Groups({"advices"})
     * @Groups({"users"})
     * @Groups({"categories"})
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=128)
     * @Assert\Length(min = 1, max = 128)
     * @Assert\NotBlank
     * @Groups({"articles"})
     * @Groups({"advices"})
     * @Groups({"users"})
     * @Groups({"categories"})
     */
    private $tagline;

    /**
     * @ORM\Column(type="string", length=32)
     * @Assert\Length(min = 1, max = 32)
     * @Groups({"articles"})
     * @Groups({"advices"})
     * @Groups({"users"})
     * @Groups({"categories"})
     */
    private $slug;

    /**
     * @ORM\OneToMany(targetEntity=Article::class, mappedBy="category")
     */
    private $articles;

    /**
     * @ORM\OneToMany(targetEntity=Advice::class, mappedBy="category", orphanRemoval=false)
     */
    private $advices;

    /**
     * @ORM\Column(type="boolean")
     */
    private $is_active;

    /**
     * @ORM\Column(type="datetime_immutable")
     */
    private $created_at;

    /**
     * @ORM\Column(type="datetime_immutable", nullable=true)
     */
    private $updated_at;

    public function __construct()
    {
        $this->articles = new ArrayCollection();
        $this->advices = new ArrayCollection();
    }

    public function __toString(): string
    {
        return $this->name;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getTagline(): ?string
    {
        return $this->tagline;
    }

    public function setTagline(string $tagline): self
    {
        $this->tagline = $tagline;

        return $this;
    }

    public function getSlug(): ?string
    {
        return $this->slug;
    }

    public function setSlug(string $slug): self
    {
        $this->slug = $slug;

        return $this;
    }

    /**
     * @return Collection<int, Article>
     */
    public function getArticles(): Collection
    {
        return $this->articles;
    }

    public function addArticle(Article $article): self
    {
        if (!$this->articles->contains($article)) {
            $this->articles[] = $article;
            $article->setCategory($this);
        }

        return $this;
    }

    public function removeArticle(Article $article): self
    {
        if ($this->articles->removeElement($article)) {
            // set the owning side to null (unless already changed)
            if ($article->getCategory() === $this) {
                $article->setCategory(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Advice>
     */
    public function getAdvices(): Collection
    {
        return $this->advices;
    }

    public function addAdvice(Advice $advice): self
    {
        if (!$this->advices->contains($advice)) {
            $this->advices[] = $advice;
            $advice->setCategory($this);
        }

        return $this;
    }

    public function removeAdvice(Advice $advice): self
    {
        if ($this->advices->removeElement($advice)) {
            // set the owning side to null (unless already changed)
            if ($advice->getCategory() === $this) {
                $advice->setCategory(null);
            }
        }

        return $this;
    }

    public function isActive(): ?bool
    {
        return $this->is_active;
    }

    public function setIsActive(bool $is_active): self
    {
        $this->is_active = $is_active;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->created_at;
    }

    public function setCreatedAt(\DateTimeImmutable $created_at): self
    {
        $this->created_at = $created_at;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeImmutable
    {
        return $this->updated_at;
    }

    public function setUpdatedAt(?\DateTimeImmutable $updated_at): self
    {
        $this->updated_at = $updated_at;

        return $this;
    }

    public function isIsActive(): ?bool
    {
        return $this->is_active;
    }
}
