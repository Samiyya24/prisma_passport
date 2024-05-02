import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto, UpdateAuthDto } from './dto';
import { Response } from 'express';
import { Tokens } from './types';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
export declare class AuthService {
    private readonly prismaService;
    private readonly jwtService;
    private readonly userwsService;
    constructor(prismaService: PrismaService, jwtService: JwtService, userwsService: UsersService);
    getTokens(userId: number, email: string): Promise<Tokens>;
    updateRefreshToken(userId: number, refreshToken: string): Promise<void>;
    signUp(createUserDto: CreateUserDto, res: Response): Promise<Tokens>;
    create(createAuthDto: CreateAuthDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateAuthDto: UpdateAuthDto): string;
    remove(id: number): string;
}
