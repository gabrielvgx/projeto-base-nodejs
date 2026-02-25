<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use App\DTO\ProfessionalAvailabilityDTO;

#[ORM\Entity]
class ProfessionalAvailabilityEntity
{


    #[ORM\Id]
    #[ORM\Column(type: "string")]
    private ?string $id = null;

    #[ORM\Column(type: "string", nullable: false)]
    private string $professionalId;

    #[ORM\Column(type: "integer", nullable: false)]
    private int $weekday;

    #[ORM\Column(type: "integer", nullable: false)]
    private int $startMinutes;

    #[ORM\Column(type: "integer", nullable: false)]
    private int $endMinutes;

    #[ORM\Column(type: "datetime_immutable", nullable: false)]
    private \DateTimeImmutable $createdAt;


    #[ORM\ManyToOne(targetEntity: UserEntity::class)]
    private ?UserEntity $professional = null;


    public function __construct(ProfessionalAvailabilityDTO $dto = new ProfessionalAvailabilityDTO())
    {
        $this->id = \Symfony\Component\Uid\Uuid::v7()->toRfc4122();
        if ($dto->professionalId !== null) {
            $this->professionalId = $dto->professionalId;
        }
        if ($dto->weekday !== null) {
            $this->weekday = $dto->weekday;
        }
        if ($dto->startMinutes !== null) {
            $this->startMinutes = $dto->startMinutes;
        }
        if ($dto->endMinutes !== null) {
            $this->endMinutes = $dto->endMinutes;
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

    public function getProfessionalId(): string
    {
        return $this->professionalId;
    }

    public function setProfessionalId(string $value): void
    {
        $this->professionalId = $value;
    }

    public function getProfessional(): UserEntity
    {
        return $this->professional;
    }

    public function setProfessional(UserEntity $value): void
    {
        $this->professional = $value;
    }

    public function getWeekday(): int
    {
        return $this->weekday;
    }

    public function setWeekday(int $value): void
    {
        $this->weekday = $value;
    }

    public function getStartMinutes(): int
    {
        return $this->startMinutes;
    }

    public function setStartMinutes(int $value): void
    {
        $this->startMinutes = $value;
    }

    public function getEndMinutes(): int
    {
        return $this->endMinutes;
    }

    public function setEndMinutes(int $value): void
    {
        $this->endMinutes = $value;
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
