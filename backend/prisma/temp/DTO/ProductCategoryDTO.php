<?php

namespace App\DTO;

class ProductCategoryDTO
{
    public function __construct(
        public ?string $productId = null,
        public ?string $categoryId = null,
        public ?\DateTimeImmutable $createdAt = null
    ) {}
}
