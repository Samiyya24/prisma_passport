import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Response } from 'express';
import { Tokens } from './types';
import { AccessTokenGuard } from '../common/guards';
import { Public } from '../common/decorators';
import { CreateUserDto } from '../users/dto/create-user.dto';


  @UseGuards(AccessTokenGuard)
  @Controller('auth')
  export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @Post('signup')
    async signUp(
      @Body() createUserDto: CreateUserDto,
      @Res({ passthrough: true }) res: Response,
    ): Promise<Tokens> {
      return this.authService.signUp(createUserDto, res);
    }

   
  }
