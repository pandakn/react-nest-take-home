import { IsString, MinLength, MaxLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  readonly username: string;

  @IsString()
  @MinLength(6)
  readonly password: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  readonly name: string;
}
