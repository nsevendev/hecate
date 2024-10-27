import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Put,
} from '@nestjs/common'
import { ArticleCgService } from './article-cg.service'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { HttpExceptionResponse } from '../../shared/exception-response/http-exception-response'
import { ArticleCg } from '../domaine/article-cg.entity'
import { UpdateArticleCgDto } from './dto/update-article-cg.dto'

@ApiTags('Article Cg Controller')
@Controller()
export class ArticleCgController {
  constructor(private readonly articleCgService: ArticleCgService) {}

  @Get('articlecgs')
  @ApiResponse({
    status: 200,
    description: 'Renvoie tous les articles des conditions generales',
    type: [ArticleCg],
  })
  @ApiResponse({
    status: 500,
    type: HttpExceptionResponse,
    description: `${InternalServerErrorException.name} => Une erreur server est survenue`,
  })
  async getArticleCgs() {
    return await this.articleCgService.getArticleCgs()
  }

  @Get('articlecg/:id')
  @ApiResponse({ status: 200, description: 'Renvoie un article des conditions generales', type: ArticleCg })
  @ApiResponse({
    status: 500,
    type: HttpExceptionResponse,
    description: `${InternalServerErrorException.name} => Une erreur server est survenue`,
  })
  @ApiResponse({
    status: 404,
    type: HttpExceptionResponse,
    description: `${NotFoundException.name} => L'article n'existe pas`,
  })
  async getArticleCgById(@Param('id') id: number) {
    return await this.articleCgService.getArticleCgById(id)
  }

  @Get('articlecgs/:ids')
  @ApiResponse({
    status: 200,
    description: 'Renvoie tous les articles des conditions generales',
    type: [ArticleCg],
  })
  @ApiResponse({
    status: 500,
    type: HttpExceptionResponse,
    description: `${InternalServerErrorException.name} => Une erreur server est survenue`,
  })
  @ApiResponse({
    status: 404,
    type: HttpExceptionResponse,
    description: `${NotFoundException.name} => "Un ou plusieurs articles n'existent pas`,
  })
  async getArticleCgsByIds(@Param('ids') ids: number[]) {
    return await this.articleCgService.getArticleCgsByIds(ids)
  }

  @Put('articlecg/:id')
  @ApiResponse({
    status: 200,
    description: "Renvoie l'article modifier",
    type: ArticleCg,
  })
  @ApiResponse({
    status: 500,
    type: HttpExceptionResponse,
    description: `${InternalServerErrorException.name} => Une erreur server est survenue`,
  })
  @ApiResponse({
    status: 404,
    type: HttpExceptionResponse,
    description: `${NotFoundException.name} => "L'articles n'exist pas`,
  })
  async updateArticleCgById(@Param('id') id: number, @Body() updateArticleCgDto: UpdateArticleCgDto) {
    return await this.articleCgService.updateArticleCgById(id, updateArticleCgDto)
  }

  @Delete('articlecgs/:ids')
  @ApiResponse({
    status: 200,
    description: 'Les articles ont été supprimés',
    type: [ArticleCg],
  })
  @ApiResponse({
    status: 500,
    type: HttpExceptionResponse,
    description: `${InternalServerErrorException.name} => Une erreur server est survenue`,
  })
  @ApiResponse({
    status: 404,
    type: HttpExceptionResponse,
    description: `${NotFoundException.name} => Un ou plusieurs articles n'existent pas`,
  })
  async deleteArticleByIds(@Param('ids') ids: number[]) {
    return await this.articleCgService.deleteArticleByIds(ids)
  }
}
