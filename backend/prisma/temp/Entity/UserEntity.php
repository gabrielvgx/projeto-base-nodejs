<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use App\DTO\UserDTO;

#[ORM\Entity]
class UserEntity
{


    #[ORM\Id]
    #[ORM\Column(type: "string")]
    private ?string $id = null;

    #[ORM\Column(type: "string", nullable: false)]
    private string $name;

    #[ORM\Column(type: "string", nullable: false)]
    private string $email;

    #[ORM\Column(type: "string")]
    private string $role;

    #[ORM\Column(type: "string", nullable: false)]
    private string $password;

    #[ORM\Column(type: "datetime_immutable", nullable: false)]
    private \DateTimeImmutable $createdAt;


    #[ORM\OneToMany(mappedBy: "", targetEntity: SchedulerEntity::class)]
    private Collection $customerSchedulers;

    #[ORM\OneToMany(mappedBy: "", targetEntity: SchedulerEntity::class)]
    private Collection $professionalSchedulers;

    #[ORM\OneToMany(mappedBy: "", targetEntity: ProfessionalAvailabilityEntity::class)]
    private Collection $professionalAvailability;


    public function __construct(UserDTO $dto = new UserDTO())
    {
        $this->id = \Symfony\Component\Uid\Uuid::v7()->toRfc4122();
        if ($dto->name !== null) {
            $this->name = $dto->name;
        }
        if ($dto->email !== null) {
            $this->email = $dto->email;
        }
        if ($dto->role !== null) {
            $this->role = $dto->role;
        }
        if ($dto->password !== null) {
            $this->password = $dto->password;
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

    public function getEmail(): string
    {
        return $this->email;
    }

    public function setEmail(string $value): void
    {
        $this->email = $value;
    }

    public function getRole(): Role
    {
        return $this->role;
    }

    public function setRole(Role $value): void
    {
        $this->role = $value;
    }

    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $value): void
    {
        $this->password = $value;
    }

    public function getCustomerSchedulers(): Collection
    {
        return $this->customerSchedulers;
    }

    public function setCustomerSchedulers(Collection $value): void
    {
        $this->customerSchedulers = $value;
    }

    public function getProfessionalSchedulers(): Collection
    {
        return $this->professionalSchedulers;
    }

    public function setProfessionalSchedulers(Collection $value): void
    {
        $this->professionalSchedulers = $value;
    }

    public function getCreatedAt(): \DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $value): void
    {
        $this->createdAt = $value;
    }

    public function getProfessionalAvailability(): Collection
    {
        return $this->professionalAvailability;
    }

    public function setProfessionalAvailability(Collection $value): void
    {
        $this->professionalAvailability = $value;
    }

}
