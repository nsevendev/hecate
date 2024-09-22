import { Injectable, Logger, NestMiddleware } from '@nestjs/common'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    private readonly logger = new Logger('LOG HTTP')

    use = (req: any, res: any, next: () => void) => {
        const ReqDateNow = Date.now()
        const { method, url } = req
        const userAgent = req.get('user-agent') || 'no user-agent'
        const body = ['POST', 'PUT'].includes(method) ? JSON.stringify(req.body) : 'no body'

        // pour la req
        this.logger.log(`REQ : ${method} ${url} - userAgent : ${userAgent} - ${body}`)

        // pour la res
        res.on('finish', () => {
            const { statusCode } = res

            this.logger.log(`RES : ${statusCode} - ${Date.now() - ReqDateNow}ms`)
        })

        next()
    }
}
