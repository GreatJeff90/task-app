import { Module } from '@nestjs/common'
import { TypeOrmModule, getRepositoryToken, getDataSourceToken } from '@nestjs/typeorm'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { User } from './entities/user.entity'
import { DataSource } from 'typeorm'
import { CustomAuthRepository } from './auth.repository'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from './jwt.strategy'
import * as config from 'config'

const { expiresIn } = config.get('jwt')

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt'} ),
    JwtModule.register({
      secret: 'afric',
      signOptions: {
        expiresIn: '2y'
      }
    })
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: getRepositoryToken(User),
      inject: [getDataSourceToken()],
      useFactory(datasource: DataSource) {
        return datasource.getRepository(User).extend(CustomAuthRepository);
      },
    },
    AuthService,
    JwtStrategy
  ],
  exports: [
    JwtStrategy,
    PassportModule
  ]
})
export class AuthModule {}
