<?php

namespace App\DTO;

class ActivityDTO
{
    public function __construct(
        public ?string $name = null,
        public ?string $description = null,
        public ?float $estimatedPrice = null,
        public ?int $estimatedDurationMinutes = null,
        public ?int $bookingLeadTimeMinutes = null,
        public ?int $bookingLeadDays = null,
        public ?\DateTimeImmutable $createdAt = null
    ) {}
}
