import { IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateArticleCgDto {
  @IsString()
  @ApiProperty({ example: 'Titre', description: "Titre de l'article" })
  title: string

  @IsString()
  @ApiProperty({ example: 'Petit intro', description: "content de l'article" })
  description?: string
}
