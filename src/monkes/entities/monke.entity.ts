import { ApiProperty } from "@nestjs/swagger";
import { MonkesColorEnum } from "../monkes-color.enum";
import { IsBoolean, IsEnum, IsNumber, IsString } from "class-validator";

export class MonkeEntity {
  @IsNumber()
  @ApiProperty({
    description: "id",
    type: Number,
    example: 1
  })
  id: number;

  @IsString()
  @ApiProperty({
    description: "name",
    type: String,
    example: "Peach"
  })
  name: string;

  @IsNumber()
  @ApiProperty({
    description: "weight",
    type: Number,
    example: 10.5
  })
  weight: number;

  @IsNumber()
  @ApiProperty({
    description: "height",
    type: Number,
    example: 80.0
  })
  height: number;

  @IsBoolean()
  @ApiProperty({
    description: "true - male; false - female",
    type: Boolean,
    example: true
  })
  gender: boolean;

  @IsEnum(MonkesColorEnum)
  @ApiProperty({
    description: "color: black / white / red",
    default: MonkesColorEnum.BLACK
  })
  color: MonkesColorEnum;

  @IsNumber()
  @ApiProperty({
    description: "Unique identification number of owner",
    type: Number,
    example: 1
  })
  owner_id: number;

  constructor(
    id: number,
    name: string,
    weight: number,
    height: number,
    gender: boolean,
    color: MonkesColorEnum,
    owner_id: number
  ) {
    this.id = id;
    this.name = name;
    this.weight = weight;
    this.height = height;
    this.gender = gender;
    this.color = color;
    this.owner_id = owner_id;
  }
}
