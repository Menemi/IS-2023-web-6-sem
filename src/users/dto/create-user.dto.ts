import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: "name",
    type: String,
    example: "Titov Daniil"
  })
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: "email",
    type: String,
    example: "danila.titov1210@yandex.ru"
  })
  email: string;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({
    description: "false - common user; true - admin",
    type: Boolean,
    default: false
  })
  is_admin: boolean;

  @IsString()
  @ApiProperty({
    description: "password",
    type: String,
    example: "1234567890"
  })
  password: string;

  constructor(name: string, email: string, password: string, is_admin: boolean) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.is_admin = is_admin;
  }
}
