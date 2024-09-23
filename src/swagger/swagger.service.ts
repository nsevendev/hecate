import { INestApplication } from '@nestjs/common'
import { SwaggerModule } from '@nestjs/swagger'
import { swaggerConfig } from './swagger.config'
import { swaggerOptions } from './swagger.option'

export function swaggerService(app: INestApplication): void {
    const document = SwaggerModule.createDocument(app, swaggerConfig, swaggerOptions)
    SwaggerModule.setup('api', app, document)
}
