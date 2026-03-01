<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use App\DTO\SchedulerDTO;

#[ORM\Entity]
class SchedulerEntity
{


    #[ORM\Id]
    #[ORM\Column(type: "string")]
    private ?string $id = null;

    #[ORM\Column(type: "string", nullable: false)]
    private string $customerId;

    #[ORM\Column(type: "datetime_immutable", nullable: false)]
    private \DateTimeImmutable $scheduledAt;

    #[ORM\Column(type: "datetime_immutable", nullable: true)]
    private \DateTimeImmutable $estimatedStartAt;

    #[ORM\Column(type: "datetime_immutable", nullable: true)]
    private \DateTimeImmutable $estimatedEndAt;

    #[ORM\Column(type: "string")]
    private string $status;

    #[ORM\Column(type: "datetime_immutable", nullable: false)]
    private \DateTimeImmutable $createdAt;


    #[ORM\ManyToOne(targetEntity: UserEntity::class)]
    private ?UserEntity $customer = null;

    #[ORM\OneToMany(mappedBy: "", targetEntity: SchedulerItemEntity::class)]
    private Collection $items;


    public function __construct(SchedulerDTO $dto = new SchedulerDTO())
    {
        $this->id = \Symfony\Component\Uid\Uuid::v7()->toRfc4122();
        if ($dto->customerId !== null) {
            $this->customerId = $dto->customerId;
        }
        if ($dto->scheduledAt !== null) {
            $this->scheduledAt = $dto->scheduledAt;
        }
        if ($dto->estimatedStartAt !== null) {
            $this->estimatedStartAt = $dto->estimatedStartAt;
        }
        if ($dto->estimatedEndAt !== null) {
            $this->estimatedEndAt = $dto->estimatedEndAt;
        }
        if ($dto->status !== null) {
            $this->status = $dto->status;
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

    public function getCustomerId(): string
    {
        return $this->customerId;
    }

    public function setCustomerId(string $value): void
    {
        $this->customerId = $value;
    }

    public function getCustomer(): UserEntity
    {
        return $this->customer;
    }

    public function setCustomer(UserEntity $value): void
    {
        $this->customer = $value;
    }

    public function getScheduledAt(): \DateTimeImmutable
    {
        return $this->scheduledAt;
    }

    public function setScheduledAt(\DateTimeImmutable $value): void
    {
        $this->scheduledAt = $value;
    }

    public function getEstimatedStartAt(): \DateTimeImmutable
    {
        return $this->estimatedStartAt;
    }

    public function setEstimatedStartAt(\DateTimeImmutable $value): void
    {
        $this->estimatedStartAt = $value;
    }

    public function getEstimatedEndAt(): \DateTimeImmutable
    {
        return $this->estimatedEndAt;
    }

    public function setEstimatedEndAt(\DateTimeImmutable $value): void
    {
        $this->estimatedEndAt = $value;
    }

    public function getItems(): Collection
    {
        return $this->items;
    }

    public function setItems(Collection $value): void
    {
        $this->items = $value;
    }

    public function getStatus(): SchedulerStatus
    {
        return $this->status;
    }

    public function setStatus(SchedulerStatus $value): void
    {
        $this->status = $value;
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
