import { AuthService } from './auth.service';
import { Response } from 'express';
import { Tokens } from './types';
import { CreateUserDto } from '../users/dto/create-user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signUp(createUserDto: CreateUserDto, res: Response): Promise<Tokens>;
}
