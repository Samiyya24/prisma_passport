import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SigInAuthDto {

  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
