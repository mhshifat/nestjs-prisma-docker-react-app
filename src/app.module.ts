/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { MovieModule } from './movie/movie.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [PrismaModule, UserModule, AuthModule, MovieModule],
})
export class AppModule { }
