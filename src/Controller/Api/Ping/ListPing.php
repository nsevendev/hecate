<?php

declare(strict_types=1);

namespace Hecate\Controller\Api\Ping;

use Hecate\Infrastructure\ApiResponse\ApiResponseFactory;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Routing\Attribute\Route;

#[AsController]
class ListPing
{
    #[Route(path: '/api/pings', name: 'hecate_api_list_ping', methods: ['GET'])]
    public function index(): Response
    {
        return ApiResponseFactory::success(data: [['ping' => 'ping']]);
    }
}
