import { DocumentBuilder } from '@nestjs/swagger'

export const swaggerConfig = new DocumentBuilder()
    .setTitle('Hecate API')
    .setDescription('Appication backend for Hecate')
    .setVersion('1.0')
    .build()
