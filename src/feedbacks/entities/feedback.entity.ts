import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class FeedbackEntity {
  @IsNumber()
  @ApiProperty({
    description: "id",
    type: Number,
    example: 1
  })
  id: number;

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
  @IsNotEmpty()
  @ApiProperty({
    description: "Unique identification number of author",
    type: Number,
    example: 1
  })
  authorId: number;

  constructor(id: number, content: string, rating: number, authorId: number) {
    this.id = id;
    this.content = content;
    this.rating = rating;
    this.authorId = authorId;
  }
}
