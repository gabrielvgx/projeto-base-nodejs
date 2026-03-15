<?php

namespace App\DTO;

class ProductDTO
{
    public function __construct(
        public ?string $name = null,
        public ?string $slug = null,
        public ?string $description = null,
        public ?float $price = null,
        public ?float $estimatedMinPrice = null,
        public ?float $estimatedMaxPrice = null,
        public ?int $bookingLeadTimeMinutes = null,
        public ?int $bookingLeadDays = null,
        public ?bool $isActive = null,
        public ?\DateTimeImmutable $createdAt = null
    ) {}
}
