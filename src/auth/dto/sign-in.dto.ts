import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SignInDto {
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: "email",
    type: String,
    example: "danila.titov1210@yandex.ru"
  })
  email: string;

  @IsString()
  @ApiProperty({
    description: "password",
    type: String,
    example: "1234567890"
  })
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}
