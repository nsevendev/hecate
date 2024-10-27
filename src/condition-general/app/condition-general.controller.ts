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
import { ConditionGeneralService } from './condition-general.service'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { HttpExceptionResponse } from '../../shared/exception-response/http-exception-response'
import { ConditionGeneral } from '../domaine/condition-general.entity'
import { CreateConditionGeneralDto } from './dto/create-condition-general.dto'
import { UpdateConditionGeneralDto } from './dto/update-condition-general.dto'
import { CreateArticleCgDto } from '../../article-cg/app/dto/create-article-cg.dto'

@ApiTags('Condition General Controller')
@Controller()
export class ConditionGeneralController {
  constructor(private readonly conditionGeneralService: ConditionGeneralService) {}

  @Get('condition-generals')
  @ApiResponse({
    status: 200,
    description: 'Renvoie toutes les conditions generales',
    type: [ConditionGeneral],
  })
  @ApiResponse({
    status: 500,
    type: HttpExceptionResponse,
    description: `${InternalServerErrorException.name} => Une erreur server est survenue`,
  })
  async getConditionGenerals() {
    return this.conditionGeneralService.getConditionGenerals()
  }

  @Get('condition-general/:id')
  @ApiResponse({ status: 200, description: 'Renvoie une condition generale', type: ConditionGeneral })
  @ApiResponse({
    status: 500,
    type: HttpExceptionResponse,
    description: `${InternalServerErrorException.name} => Une erreur server est survenue`,
  })
  @ApiResponse({
    status: 404,
    type: HttpExceptionResponse,
    description: `${NotFoundException.name} => La condition generale n'existe pas été`,
  })
  async getConditionGeneralById(@Param('id') id: number) {
    return this.conditionGeneralService.getConditionGeneralById(id)
  }

  @Post('condition-general/create')
  @ApiResponse({
    status: 201,
    description: 'La condition generale créée',
    type: ConditionGeneral,
  })
  @ApiResponse({
    status: 500,
    type: HttpExceptionResponse,
    description: `${InternalServerErrorException.name} => Une erreur server est survenue`,
  })
  async createConditionGeneral(@Body() createConditionGeneral: CreateConditionGeneralDto) {
    return this.conditionGeneralService.createConditionGeneral(createConditionGeneral)
  }

  @Put('condition-general/:id')
  @ApiResponse({
    status: 200,
    description: 'La condition generale mise à jour',
    type: ConditionGeneral,
  })
  @ApiResponse({
    status: 500,
    type: HttpExceptionResponse,
    description: `${InternalServerErrorException.name} => Une erreur server est survenue`,
  })
  @ApiResponse({
    status: 404,
    type: HttpExceptionResponse,
    description: `${NotFoundException.name} => La condition generale n'existe pas`,
  })
  async updateConditionGeneralById(
    @Param('id') id: number,
    @Body() updateConditionGeneral: UpdateConditionGeneralDto
  ) {
    return this.conditionGeneralService.updateConditionGeneralById(id, updateConditionGeneral)
  }

  @Put('condition-general/:id/article-cg/create')
  @ApiResponse({
    status: 200,
    description: 'Les articles ont été ajoutés à la condition generale',
    type: ConditionGeneral,
  })
  @ApiResponse({
    status: 500,
    type: HttpExceptionResponse,
    description: `${InternalServerErrorException.name} => Une erreur server est survenue`,
  })
  @ApiResponse({
    status: 404,
    type: HttpExceptionResponse,
    description: `${NotFoundException.name} => La condition generale n'existe pas`,
  })
  async addArticlesToConditionGeneralById(
    @Param('id') id: number,
    @Body() createArticleCgDto: CreateArticleCgDto[]
  ) {
    return this.conditionGeneralService.addArticlesToConditionGeneralById(id, createArticleCgDto)
  }

  @Delete('condition-general/:id/article-cg/:articleCgIds')
  @ApiResponse({
    status: 200,
    description: 'Les articles ont été supprimés de la condition generale',
    type: ConditionGeneral,
  })
  @ApiResponse({
    status: 500,
    type: HttpExceptionResponse,
    description: `${InternalServerErrorException.name} => Une erreur server est survenue`,
  })
  @ApiResponse({
    status: 404,
    type: HttpExceptionResponse,
    description: `${NotFoundException.name} => La condition generale n'existe pas`,
  })
  async deleteArticlesFromConditionGeneralById(
    @Param('id') id: number,
    @Param('articleCgIds') articleCgIds: number[]
  ) {
    return this.conditionGeneralService.deleteArticlesFromConditionGeneralById(id, articleCgIds)
  }

  @Delete('condition-general/:id')
  @ApiResponse({
    status: 200,
    description: 'La condition generale a été supprimée',
    type: ConditionGeneral,
  })
  @ApiResponse({
    status: 500,
    type: HttpExceptionResponse,
    description: `${InternalServerErrorException.name} => Une erreur server est survenue`,
  })
  @ApiResponse({
    status: 404,
    type: HttpExceptionResponse,
    description: `${NotFoundException.name} => La condition generale n'existe pas`,
  })
  async deleteConditionGeneralById(@Param('id') id: number) {
    return this.conditionGeneralService.deleteConditionGeneralById(id)
  }
}
