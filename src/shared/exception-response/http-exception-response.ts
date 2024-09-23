import { ApiProperty } from '@nestjs/swagger'

export class HttpExceptionResponse {
    @ApiProperty({ example: 500 })
    statusCode: number

    @ApiProperty({ example: 'Internal server' })
    error: string

    @ApiProperty({
        description: "Message détaillé de l'erreur",
        oneOf: [
            { type: 'string', example: 'Une erreur serveur est survenue.' },
            {
                type: 'string[]',
                items: { type: 'string', example: 'Une erreur serveur est survenue.' },
                example: ['Erreur 1', 'Erreur 2'],
            },
        ],
    })
    message: string | string[]
}
