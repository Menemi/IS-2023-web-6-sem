import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsString } from "class-validator";

export class UserAbbreviatedEntity {
  @IsNumber()
  @ApiProperty({
    description: "unique identification number",
    type: Number,
    example: 1
  })
  id: number;

  @IsString()
  @ApiProperty({
    description: "name",
    type: String,
    example: "Titov Daniil"
  })
  name: string;

  @IsString()
  @ApiProperty({
    description: "email",
    type: String,
    example: "danila.titov1210@yandex.ru"
  })
  email: string;

  @IsBoolean()
  @ApiProperty({
    description: "false - common user; true - admin",
    type: Boolean,
    default: false
  })
  is_admin: boolean;


  constructor(
    id: number,
    name: string,
    email: string,
    is_admin: boolean = false
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.is_admin = is_admin;
  }
}
