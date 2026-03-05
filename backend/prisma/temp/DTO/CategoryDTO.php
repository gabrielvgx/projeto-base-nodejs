<?php

namespace App\DTO;

class CategoryDTO
{
    public function __construct(
        public ?string $name = null,
        public ?string $slug = null,
        public ?string $description = null,
        public ?bool $isActive = null,
        public ?int $orderIndex = null,
        public ?string $parentId = null,
        public ?\DateTimeImmutable $createdAt = null
    ) {}
}
