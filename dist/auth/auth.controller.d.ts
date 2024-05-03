import { AuthService } from './auth.service';
import { Response } from 'express';
import { Tokens } from './types';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { SignInDto } from './dto/signin.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signUp(createUserDto: CreateUserDto, res: Response): Promise<Tokens>;
    signIn(signInDto: SignInDto, res: Response): Promise<Tokens>;
    signout(userId: number, res: Response): Promise<boolean>;
    refreshTokens(userId: number, refreshToken: string, res: Response): Promise<Tokens>;
}
