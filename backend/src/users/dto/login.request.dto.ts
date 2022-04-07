import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginRequestDto {
  @IsEmail()
  @ApiProperty({
    example: 'aaa@aaa.aaa',
    description: 'email'
  })
  public email: string;
  
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'password',
    description: 'password'
  })
  public password: string;
}
