import { Request, Response, NextFunction } from 'express'
import { LoggerMiddleware } from './logger.middleware'
import { Logger } from '@nestjs/common'

describe('LoggerMiddleware', () => {
    let loggerMiddleware: LoggerMiddleware
    let mockRequest: Partial<Request>
    let mockResponse: Partial<Response>
    let mockNext: NextFunction

    beforeAll(() => {
        loggerMiddleware = new LoggerMiddleware()

        mockRequest = {
            method: 'GET',
            url: '/test-url',
            get: jest.fn().mockReturnValue('test-user-agent'),
        }

        mockResponse = {
            on: jest.fn(),
            statusCode: 200,
        }

        mockNext = jest.fn()
        jest.spyOn(Logger.prototype, 'log').mockImplementation()
    })

    afterEach(() => {
        // Nettoyer les mocks après chaque test
        jest.clearAllMocks()
    })

    it('LoggerMiddleware est defini', () => {
        expect(loggerMiddleware).toBeDefined()
    })

    it('LoggerMiddleware utilise la methode use', () => {
        expect(loggerMiddleware.use).toBeDefined()
    })

    it('Fonction use log la REQ', () => {
        loggerMiddleware.use(mockRequest as Request, mockResponse as Response, mockNext)

        expect(Logger.prototype.log).toHaveBeenCalledWith(
            'REQ : GET /test-url - userAgent : test-user-agent - no body'
        )
    })

    it('Fonction use log la RES event finish', () => {
        loggerMiddleware.use(mockRequest as Request, mockResponse as Response, mockNext)
        expect(Logger.prototype.log).toHaveBeenCalledWith(
            'REQ : GET /test-url - userAgent : test-user-agent - no body'
        )

        // Simuler l'appel de `res.on('finish')`
        const resOnMock = (mockResponse.on as jest.Mock).mock.calls[0][1]
        resOnMock()

        expect(Logger.prototype.log).toHaveBeenCalledWith(expect.stringContaining('RES : 200 - '))
    })

    it('Fonction "use" appelle next()', () => {
        loggerMiddleware.use(mockRequest as Request, mockResponse as Response, mockNext)
        expect(mockNext).toHaveBeenCalled()
    })
})
