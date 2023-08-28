import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateFeedbackDto {
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

  @IsNumber()
  @ApiProperty({
    description: "Unique identification number of author",
    type: Number,
    example: 1
  })
  author_id: number;

  constructor(content: string, rating: number, author_id: number) {
    this.content = content;
    this.rating = rating;
    this.author_id = author_id;
  }
}
