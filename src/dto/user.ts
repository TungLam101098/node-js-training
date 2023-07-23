import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class UserDto {
  @IsString()
  @IsNotEmpty({ message: 'username is required' })
  username!: string;

  @IsString()
  @IsNotEmpty({ message: 'password is required' })
  password!: string;

  @IsNumber()
  @IsOptional()
  age!: number;

  @IsString()
  @IsOptional()
  address!: string;
}
