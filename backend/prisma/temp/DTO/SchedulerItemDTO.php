<?php

namespace App\DTO;

class SchedulerItemDTO
{
    public function __construct(
        public ?string $schedulerId = null,
        public ?string $activityId = null,
        public ?string $productId = null,
        public ?int $quantity = null,
        public ?float $priceAtBooking = null,
        public ?int $durationMinutes = null,
        public ?int $orderIndex = null,
        public ?\DateTimeImmutable $createdAt = null
    ) {}
}
