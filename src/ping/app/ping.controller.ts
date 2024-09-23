import { Body, Controller, Get, Post } from '@nestjs/common'
import { PingService } from './ping.service'
import { CreatePingDto } from './create-ping.dto'

@Controller('ping')
export class PingController {
    constructor(private readonly pingService: PingService) {}

    @Get()
    async firstPing() {
        return this.pingService.getFirstPing()
    }

    @Post('create')
    async createPing(@Body() createPingDto: CreatePingDto) {
        return this.pingService.createPing(createPingDto)
    }
}
