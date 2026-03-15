<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use App\DTO\ProductCategoryDTO;

#[ORM\Entity]
class ProductCategoryEntity
{


    #[ORM\Id]
    #[ORM\Column(type: "string")]
    private ?string $id = null;

    #[ORM\Column(type: "string", nullable: false)]
    private string $productId;

    #[ORM\Column(type: "string", nullable: false)]
    private string $categoryId;

    #[ORM\Column(type: "datetime_immutable", nullable: false)]
    private \DateTimeImmutable $createdAt;


    #[ORM\ManyToOne(targetEntity: ProductEntity::class)]
    private ?ProductEntity $product = null;

    #[ORM\ManyToOne(targetEntity: CategoryEntity::class)]
    private ?CategoryEntity $category = null;


    public function __construct(ProductCategoryDTO $dto = new ProductCategoryDTO())
    {
        $this->id = \Symfony\Component\Uid\Uuid::v7()->toRfc4122();
        if ($dto->productId !== null) {
            $this->productId = $dto->productId;
        }
        if ($dto->categoryId !== null) {
            $this->categoryId = $dto->categoryId;
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

    public function getProductId(): string
    {
        return $this->productId;
    }

    public function setProductId(string $value): void
    {
        $this->productId = $value;
    }

    public function getProduct(): ProductEntity
    {
        return $this->product;
    }

    public function setProduct(ProductEntity $value): void
    {
        $this->product = $value;
    }

    public function getCategoryId(): string
    {
        return $this->categoryId;
    }

    public function setCategoryId(string $value): void
    {
        $this->categoryId = $value;
    }

    public function getCategory(): CategoryEntity
    {
        return $this->category;
    }

    public function setCategory(CategoryEntity $value): void
    {
        $this->category = $value;
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
