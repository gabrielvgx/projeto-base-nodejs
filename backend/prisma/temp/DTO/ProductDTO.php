<?php

namespace App\DTO;

class ProductDTO
{
    public function __construct(
        public ?string $name = null,
        public ?string $description = null,
        public ?float $price = null,
        public ?float $estimatedMinPrice = null,
        public ?float $estimatedMaxPrice = null,
        public ?\DateTimeImmutable $createdAt = null
    ) {}
}
