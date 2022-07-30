/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as argon from "argon2";
import { PrismaService } from './../prisma/prisma.service';
import { Auth } from "./dto/auth.dto";

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService, private jwtService: JwtService) { }

  async login(dto: Auth) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (!user) throw new BadRequestException("Wrong credential");
    const isPwdMatched = await argon.verify(user.password, dto.password);
    if (!isPwdMatched) throw new BadRequestException("Wrong credential");
    const accessToken = await this.singJwt(user.id, user.email);
    delete user.password;
    return { token: accessToken, user: user }
  }

  async singJwt(id: number, email: string) {
    const payload = { id, email };
    return this.jwtService.sign(payload, { expiresIn: "15m" });
  }
}