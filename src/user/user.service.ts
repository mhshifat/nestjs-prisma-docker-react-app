/* eslint-disable prettier/prettier */
import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from './dto';
import * as argon from "argon2";
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }

  users() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        created_at: true,
        first_name: true,
        last_name: true,
        email: true,
      }
    });
  }

  async create(dto: UserDto) {
    try {
      const hashPassword = await argon.hash(dto.password);
      const doc = await this.prisma.user.create({
        data: { ...dto, password: hashPassword }
      });
      delete doc.password;
      return doc;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === "P2002") {
          throw new ForbiddenException("Credential taken");
        }
      }
      throw err;
    }
  }
}
