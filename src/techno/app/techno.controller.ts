import {
    Body,
    Controller,
    Delete,
    Get,
    InternalServerErrorException,
    NotFoundException,
    Param,
    Post,
    Put,
} from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { TechnoService } from './techno.service'
import { CreateTechnoDto } from './create-techno.dto'
import { HttpExceptionResponse } from '../../shared/exception-response/http-exception-response'
import { Techno } from '../domaine/techno.entity'
import { UpdateTechnoDto } from './update-techno.dto'

@ApiTags('Techno Controller')
@Controller()
export class TechnoController {
    constructor(private readonly technoService: TechnoService) {}

    @Get('technos')
    @ApiResponse({ status: 200, description: 'Renvoie toutes les technos', type: [Techno] })
    @ApiResponse({
        status: 500,
        type: HttpExceptionResponse,
        description: `${InternalServerErrorException.name} => Une erreur server est survenue`,
    })
    async getTechnos() {
        return this.technoService.getTechnos()
    }

    @Get('techno/:id')
    @ApiResponse({ status: 200, description: 'Renvoie la techno', type: Techno })
    @ApiResponse({
        status: 500,
        type: HttpExceptionResponse,
        description: `${InternalServerErrorException.name} => Une erreur server est survenue`,
    })
    @ApiResponse({
        status: 404,
        type: HttpExceptionResponse,
        description: `${NotFoundException.name} => La techno n'a pas été trouvée`,
    })
    async getTechnoById(@Param('id') id: number) {
        return this.technoService.getTechnoById(id)
    }

    @Post('techno/create')
    @ApiResponse({ status: 201, description: 'La Techno a été créé', type: Techno })
    @ApiResponse({
        status: 500,
        type: HttpExceptionResponse,
        description: `${InternalServerErrorException.name} => Une erreur server est survenue`,
    })
    async createTechno(@Body() createTechnpDto: CreateTechnoDto) {
        return this.technoService.createTechno(createTechnpDto)
    }

    @Put('techno/:id')
    @ApiResponse({ status: 200, description: 'La Techno a été modifié', type: Techno })
    @ApiResponse({
        status: 500,
        type: HttpExceptionResponse,
        description: `${InternalServerErrorException.name} => Une erreur server est survenue`,
    })
    @ApiResponse({
        status: 404,
        type: HttpExceptionResponse,
        description: `${NotFoundException.name} => La techno n'a pas été trouvée`,
    })
    async updateTechnoById(@Param('id') id: number, @Body() updateTechnpDto: UpdateTechnoDto) {
        return this.technoService.updateTechnoById(id, updateTechnpDto)
    }

    @Delete('techno/:id')
    @ApiResponse({ status: 200, description: 'La Techno a été supprimé' })
    @ApiResponse({
        status: 500,
        type: HttpExceptionResponse,
        description: `${InternalServerErrorException.name} => Une erreur server est survenue`,
    })
    @ApiResponse({
        status: 404,
        type: HttpExceptionResponse,
        description: `${NotFoundException.name} => La techno n'a pas été trouvée`,
    })
    async deleteTechnoById(@Param('id') id: number) {
        return this.technoService.deleteTechnoById(id)
    }
}
