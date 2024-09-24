import { Body, ConflictException, Controller, Get, NotFoundException, Post } from '@nestjs/common'
import { PingService } from './ping.service'
import { CreatePingDto } from './create-ping.dto'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { Ping } from '../domaine/ping.entity'
import { HttpExceptionResponse } from '../../shared/exception-response/http-exception-response'

@ApiTags('Ping Controller')
@Controller('ping')
export class PingController {
    constructor(private readonly pingService: PingService) {}

    @Get()
    @ApiResponse({ status: 200, description: 'Renvoie le premier ping', type: Ping })
    @ApiResponse({
        status: 404,
        type: HttpExceptionResponse,
        description: `${NotFoundException.name} => Aucun ping existe`,
    })
    async firstPing() {
        return this.pingService.getFirstPing()
    }

    @Post('create')
    @ApiResponse({ status: 200, description: 'Renvoie le ping créé', type: Ping })
    @ApiResponse({
        status: 409,
        type: HttpExceptionResponse,
        description: `${ConflictException.name} => Si un ping existe deja, impossible de créer un ping`,
    })
    async createPing(@Body() createPingDto: CreatePingDto) {
        return this.pingService.createPing(createPingDto)
    }
}
