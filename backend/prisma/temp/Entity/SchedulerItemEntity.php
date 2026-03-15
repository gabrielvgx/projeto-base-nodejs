<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use App\DTO\SchedulerItemDTO;

#[ORM\Entity]
class SchedulerItemEntity
{


    #[ORM\Id]
    #[ORM\Column(type: "string")]
    private ?string $id = null;

    #[ORM\Column(type: "string", nullable: false)]
    private string $schedulerId;

    #[ORM\Column(type: "string", nullable: true)]
    private string $productId;

    #[ORM\Column(type: "integer", nullable: false)]
    private int $quantity;

    #[ORM\Column(type: "float", nullable: true)]
    private float $priceAtBooking;

    #[ORM\Column(type: "integer", nullable: true)]
    private int $durationMinutes;

    #[ORM\Column(type: "integer", nullable: false)]
    private int $orderIndex;

    #[ORM\Column(type: "datetime_immutable", nullable: false)]
    private \DateTimeImmutable $createdAt;


    #[ORM\ManyToOne(targetEntity: SchedulerEntity::class)]
    private ?SchedulerEntity $scheduler = null;

    #[ORM\ManyToOne(targetEntity: ProductEntity::class)]
    private ?ProductEntity $product = null;


    public function __construct(SchedulerItemDTO $dto = new SchedulerItemDTO())
    {
        $this->id = \Symfony\Component\Uid\Uuid::v7()->toRfc4122();
        if ($dto->schedulerId !== null) {
            $this->schedulerId = $dto->schedulerId;
        }
        if ($dto->productId !== null) {
            $this->productId = $dto->productId;
        }
        if ($dto->quantity !== null) {
            $this->quantity = $dto->quantity;
        }
        if ($dto->priceAtBooking !== null) {
            $this->priceAtBooking = $dto->priceAtBooking;
        }
        if ($dto->durationMinutes !== null) {
            $this->durationMinutes = $dto->durationMinutes;
        }
        if ($dto->orderIndex !== null) {
            $this->orderIndex = $dto->orderIndex;
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

    public function getSchedulerId(): string
    {
        return $this->schedulerId;
    }

    public function setSchedulerId(string $value): void
    {
        $this->schedulerId = $value;
    }

    public function getScheduler(): SchedulerEntity
    {
        return $this->scheduler;
    }

    public function setScheduler(SchedulerEntity $value): void
    {
        $this->scheduler = $value;
    }

    public function getProductId(): string
    {
        return $this->productId;
    }

    public function setProductId(string $value): void
    {
        $this->productId = $value;
    }

    public function getProduct(): ProductEntity
    {
        return $this->product;
    }

    public function setProduct(ProductEntity $value): void
    {
        $this->product = $value;
    }

    public function getQuantity(): int
    {
        return $this->quantity;
    }

    public function setQuantity(int $value): void
    {
        $this->quantity = $value;
    }

    public function getPriceAtBooking(): float
    {
        return $this->priceAtBooking;
    }

    public function setPriceAtBooking(float $value): void
    {
        $this->priceAtBooking = $value;
    }

    public function getDurationMinutes(): int
    {
        return $this->durationMinutes;
    }

    public function setDurationMinutes(int $value): void
    {
        $this->durationMinutes = $value;
    }

    public function getOrderIndex(): int
    {
        return $this->orderIndex;
    }

    public function setOrderIndex(int $value): void
    {
        $this->orderIndex = $value;
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
