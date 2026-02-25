<?php

namespace App\DTO;

class ProfessionalAvailabilityDTO
{
    public function __construct(
        public ?string $professionalId = null,
        public ?int $weekday = null,
        public ?int $startMinutes = null,
        public ?int $endMinutes = null,
        public ?\DateTimeImmutable $createdAt = null
    ) {}
}
