<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use App\DTO\ProductDTO;

#[ORM\Entity]
class ProductEntity
{


    #[ORM\Id]
    #[ORM\Column(type: "string")]
    private ?string $id = null;

    #[ORM\Column(type: "string", nullable: false)]
    private string $name;

    #[ORM\Column(type: "string", nullable: true)]
    private string $description;

    #[ORM\Column(type: "float", nullable: false)]
    private float $price;

    #[ORM\Column(type: "float", nullable: false)]
    private float $estimatedMinPrice;

    #[ORM\Column(type: "float", nullable: false)]
    private float $estimatedMaxPrice;

    #[ORM\Column(type: "integer", nullable: false)]
    private int $bookingLeadTimeMinutes;

    #[ORM\Column(type: "integer", nullable: false)]
    private int $bookingLeadDays;

    #[ORM\Column(type: "datetime_immutable", nullable: false)]
    private \DateTimeImmutable $createdAt;


    #[ORM\OneToMany(mappedBy: "", targetEntity: SchedulerItemEntity::class)]
    private Collection $schedulerItems;


    public function __construct(ProductDTO $dto = new ProductDTO())
    {
        $this->id = \Symfony\Component\Uid\Uuid::v7()->toRfc4122();
        if ($dto->name !== null) {
            $this->name = $dto->name;
        }
        if ($dto->description !== null) {
            $this->description = $dto->description;
        }
        if ($dto->price !== null) {
            $this->price = $dto->price;
        }
        if ($dto->estimatedMinPrice !== null) {
            $this->estimatedMinPrice = $dto->estimatedMinPrice;
        }
        if ($dto->estimatedMaxPrice !== null) {
            $this->estimatedMaxPrice = $dto->estimatedMaxPrice;
        }
        if ($dto->bookingLeadTimeMinutes !== null) {
            $this->bookingLeadTimeMinutes = $dto->bookingLeadTimeMinutes;
        }
        if ($dto->bookingLeadDays !== null) {
            $this->bookingLeadDays = $dto->bookingLeadDays;
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

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $value): void
    {
        $this->name = $value;
    }

    public function getDescription(): string
    {
        return $this->description;
    }

    public function setDescription(string $value): void
    {
        $this->description = $value;
    }

    public function getPrice(): float
    {
        return $this->price;
    }

    public function setPrice(float $value): void
    {
        $this->price = $value;
    }

    public function getEstimatedMinPrice(): float
    {
        return $this->estimatedMinPrice;
    }

    public function setEstimatedMinPrice(float $value): void
    {
        $this->estimatedMinPrice = $value;
    }

    public function getEstimatedMaxPrice(): float
    {
        return $this->estimatedMaxPrice;
    }

    public function setEstimatedMaxPrice(float $value): void
    {
        $this->estimatedMaxPrice = $value;
    }

    public function getBookingLeadTimeMinutes(): int
    {
        return $this->bookingLeadTimeMinutes;
    }

    public function setBookingLeadTimeMinutes(int $value): void
    {
        $this->bookingLeadTimeMinutes = $value;
    }

    public function getBookingLeadDays(): int
    {
        return $this->bookingLeadDays;
    }

    public function setBookingLeadDays(int $value): void
    {
        $this->bookingLeadDays = $value;
    }

    public function getSchedulerItems(): Collection
    {
        return $this->schedulerItems;
    }

    public function setSchedulerItems(Collection $value): void
    {
        $this->schedulerItems = $value;
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
