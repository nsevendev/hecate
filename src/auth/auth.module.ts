import { Module } from '@nestjs/common'
import { AuthController } from './app/auth.controller'
import { AuthService } from './app/auth.service'

@Module({
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
