import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateMonkeDto } from "./create-monke.dto";
import { IsNotEmpty, IsNumber } from "class-validator";

export class UpdateMonkeDto extends PartialType(CreateMonkeDto) {
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

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: "unique owner identification number",
    type: Number,
    example: 1
  })
  owner_id: number;

  constructor(weight: number, height: number, owner_id: number) {
    super();
    this.weight = weight;
    this.height = height;
    this.owner_id = owner_id;
  }
}
