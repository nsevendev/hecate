<?php

declare(strict_types=1);

namespace Hecate\Entity\Ping;

use Doctrine\ORM\Mapping as ORM;
use Hecate\Entity\Ping\Type\PingId;
use Hecate\Repository\Ping\PingEntityRepository;

#[ORM\Entity(repositoryClass: PingEntityRepository::class)]
class PingEntity
{
    #[ORM\Id]
    #[ORM\Column(type: 'app_uid', unique: true)]
    private PingId $id;

    public function id(): PingId
    {
        return $this->id;
    }

    #[ORM\Column]
    private ?int $status;

    public function status(): ?int
    {
        return $this->status;
    }

    #[ORM\Column(length: 255)]
    private ?string $message;

    public function message(): ?string
    {
        return $this->message;
    }

    public function __construct(
        ?int $status,
        ?string $message,
    ) {
        $this->id = PingId::create();
        $this->status = $status;
        $this->message = $message;
    }
}
