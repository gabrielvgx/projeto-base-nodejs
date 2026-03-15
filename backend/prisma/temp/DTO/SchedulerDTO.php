<?php

namespace App\DTO;

class SchedulerDTO
{
    public function __construct(
        public ?string $customerId = null,
        public ?\DateTimeImmutable $scheduledAt = null,
        public ?\DateTimeImmutable $estimatedStartAt = null,
        public ?\DateTimeImmutable $estimatedEndAt = null,
        public ?SchedulerStatus $status = null,
        public ?\DateTimeImmutable $createdAt = null
    ) {}
}
