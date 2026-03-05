<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use App\DTO\CategoryDTO;

#[ORM\Entity]
class CategoryEntity
{


    #[ORM\Id]
    #[ORM\Column(type: "string")]
    private ?string $id = null;

    #[ORM\Column(type: "string", nullable: false)]
    private string $name;

    #[ORM\Column(type: "string", nullable: false)]
    private string $slug;

    #[ORM\Column(type: "string", nullable: true)]
    private string $description;

    #[ORM\Column(type: "boolean", nullable: false)]
    private bool $isActive;

    #[ORM\Column(type: "integer", nullable: false)]
    private int $orderIndex;

    #[ORM\Column(type: "string", nullable: true)]
    private string $parentId;

    #[ORM\Column(type: "datetime_immutable", nullable: false)]
    private \DateTimeImmutable $createdAt;


    #[ORM\ManyToOne(targetEntity: CategoryEntity::class)]
    private ?CategoryEntity $parent = null;

    #[ORM\OneToMany(mappedBy: "", targetEntity: CategoryEntity::class)]
    private Collection $children;

    #[ORM\OneToMany(mappedBy: "", targetEntity: ProductCategoryEntity::class)]
    private Collection $products;


    public function __construct(CategoryDTO $dto = new CategoryDTO())
    {
        $this->id = \Symfony\Component\Uid\Uuid::v7()->toRfc4122();
        if ($dto->name !== null) {
            $this->name = $dto->name;
        }
        if ($dto->slug !== null) {
            $this->slug = $dto->slug;
        }
        if ($dto->description !== null) {
            $this->description = $dto->description;
        }
        if ($dto->isActive !== null) {
            $this->isActive = $dto->isActive;
        }
        if ($dto->orderIndex !== null) {
            $this->orderIndex = $dto->orderIndex;
        }
        if ($dto->parentId !== null) {
            $this->parentId = $dto->parentId;
        }
        $this->createdAt = new \DateTimeImmutable();
    }



    public function getId(): string
    {
        return $this->id;
    }

    public function setId(string $value): void
    {
        $this->id = $value;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $value): void
    {
        $this->name = $value;
    }

    public function getSlug(): string
    {
        return $this->slug;
    }

    public function setSlug(string $value): void
    {
        $this->slug = $value;
    }

    public function getDescription(): string
    {
        return $this->description;
    }

    public function setDescription(string $value): void
    {
        $this->description = $value;
    }

    public function getIsActive(): bool
    {
        return $this->isActive;
    }

    public function setIsActive(bool $value): void
    {
        $this->isActive = $value;
    }

    public function getOrderIndex(): int
    {
        return $this->orderIndex;
    }

    public function setOrderIndex(int $value): void
    {
        $this->orderIndex = $value;
    }

    public function getParentId(): string
    {
        return $this->parentId;
    }

    public function setParentId(string $value): void
    {
        $this->parentId = $value;
    }

    public function getParent(): CategoryEntity
    {
        return $this->parent;
    }

    public function setParent(CategoryEntity $value): void
    {
        $this->parent = $value;
    }

    public function getChildren(): Collection
    {
        return $this->children;
    }

    public function setChildren(Collection $value): void
    {
        $this->children = $value;
    }

    public function getProducts(): Collection
    {
        return $this->products;
    }

    public function setProducts(Collection $value): void
    {
        $this->products = $value;
    }

    public function getCreatedAt(): \DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $value): void
    {
        $this->createdAt = $value;
    }

}
