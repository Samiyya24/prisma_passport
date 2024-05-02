import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto, UpdateAuthDto } from './dto';
import { Response } from 'express';
import { JwtPayload, Tokens } from './types';
import { SigInAuthDto } from './dto/signIn-auth.dto';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Not } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly userwsService:UsersService
  ) {}

  async getTokens(userId: number, email: string): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: userId,
      email: email,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 7);
    await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedRefreshToken,
      },
    });
  }

  async signUp(createUserDto: CreateUserDto, res: Response) {
    const newUser = await this.userwsService.create(createUserDto);
    if(!newUser){
      throw new InternalServerErrorException('Yange user yaratishda xatolik')
    }

    const tokens = await this.getTokens(newUser.id, newUser.email);
    await this.updateRefreshToken(newUser.id, tokens.refresh_token);

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });

    return tokens;
  }

  // async signin(loginAdminDto: SigInAuthDto, res: Response) {
  //   const { email, password } = loginAdminDto;
  //   const admin = await this.adminRepo.findOne({ where: { email } });
  //   if (!admin) {
  //     throw new BadRequestException('Admin not found');
  //   }
  //   if (!admin.is_active) {
  //     throw new BadRequestException('Admin  is not activate');
  //   }
  //   const isMatchPass = await bcrypt.compare(password, admin.hashed_password);
  //   if (!isMatchPass) {
  //     throw new BadRequestException('Password do not match');
  //   }

  //   const tokens = await this.getTokens(admin);
  //   const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
  //   const updatedAdmin = await this.adminRepo.update(
  //     { hashed_refresh_token },
  //     {
  //       where: { id: admin.id },
  //       returning: true,
  //     },
  //   );
  //   res.cookie('refresh_token', tokens.refresh_token, {
  //     maxAge: 15 * 24 * 60 * 60 * 1000,
  //     httpOnly: true,
  //   });
  //   const response = {
  //     message: 'Admin logged in',
  //     admin: updatedAdmin[1][0],
  //     tokens,
  //   };
  //   return response;
  // }

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
