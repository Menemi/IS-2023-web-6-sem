import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateFeedbackDto } from "./create-feedback.dto";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateFeedbackDto extends PartialType(CreateFeedbackDto) {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "content",
    type: String,
    example: "Cool web-site, cool community, I wonder of it"
  })
  content: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: "rating",
    type: Number,
    example: 5
  })
  rating: number;

  constructor(content: string, rating: number) {
    super();
    this.content = content;
    this.rating = rating;
  }
}
