import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Expose, Transform } from 'class-transformer';

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(3, {
    message: 'Name is too short. Minimum length is 3 characters.',
  })
  @MaxLength(50, {
    message: 'Name is too long. Maximum length is 50 characters.',
  })
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @Transform(({ value }) => value ?? 0)
  albumCount: number = 0;

  @IsOptional()
  @Expose()
  createdAt: string = new Date().toISOString();

  @IsOptional()
  @Expose()
  updatedAt: string = new Date().toISOString();
}
