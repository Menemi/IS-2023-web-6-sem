import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { MonkesColorEnum } from "../monkes-color.enum";

export class CreateMonkeDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "name",
    type: String,
    example: "Peach"
  })
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: "weight",
    type: Number,
    example: 10.5
  })
  weight: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: "height",
    type: Number,
    example: 80.0
  })
  height: number;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    description: "true - male; false - female",
    type: Boolean,
    example: true
  })
  gender: boolean;

  @IsEnum(MonkesColorEnum)
  @IsNotEmpty()
  @ApiProperty({
    description: "color: black / white / red",
    default: MonkesColorEnum.BLACK
  })
  color: MonkesColorEnum;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: "unique owner identification number",
    type: Number,
    example: 1
  })
  owner_id: number;

  constructor(
    name: string,
    weight: number,
    height: number,
    gender: boolean,
    color: MonkesColorEnum,
    owner_id: number
  ) {
    this.name = name;
    this.weight = weight;
    this.height = height;
    this.gender = gender;
    this.color = color;
    this.owner_id = owner_id;
  }
}
