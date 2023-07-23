import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class UserDto {
  @IsString()
  @IsNotEmpty({ message: 'username is required' })
  userName!: string;

  @IsString()
  @IsNotEmpty({ message: 'password is required' })
  password!: string;

  @IsNumber()
  age!: number;

  @IsString()
  address!: string;
}
