<?php

declare(strict_types=1);

namespace Hecate\Controller\Api\Ping;

use Hecate\Infrastructure\ApiResponse\ApiResponseFactory;
use Hecate\Infrastructure\ApiResponse\Exception\Custom\Ping\PingException;
use Hecate\Infrastructure\ApiResponse\Exception\Error\Error;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Routing\Attribute\Route;

#[AsController]
class ListPing
{
    /**
     * @throws PingException
     */
    #[Route(path: '/api/pings', name: 'hecate_api_list_ping', methods: ['GET'])]
    public function index(): Response
    {
        throw new PingException(errors: [Error::create('ping', 'erreur magnifique')]);

        return ApiResponseFactory::success(data: [['ping' => 'ping']]);
    }
}
