import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @MinLength(3, {
    message: 'Name is too short. Minimum length is 3 characters.',
  })
  @MaxLength(50, {
    message: 'Name is too long. Maximum length is 50 characters.',
  })
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  albumCount?: number = 0;

  @IsOptional()
  updatedAt: string = new Date().toISOString();
}
