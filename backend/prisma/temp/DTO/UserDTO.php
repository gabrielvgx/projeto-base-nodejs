<?php

namespace App\DTO;

class UserDTO
{
    public function __construct(
        public ?string $name = null,
        public ?string $email = null,
        public ?UserRole $role = null,
        public ?string $password = null,
        public ?\DateTimeImmutable $createdAt = null
    ) {}
}
