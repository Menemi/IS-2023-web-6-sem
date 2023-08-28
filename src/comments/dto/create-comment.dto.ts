import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "content",
    type: String,
    example:
      "As I understand it, they will be there until the MS-24 " +
      "arrives with a replacement crew.\nI wonder if it counts as a double" +
      " rate, like overtime :)"
  })
  content: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: "Unique identification number of post",
    type: Number,
    example: 1
  })
  postId: number;

  @IsNumber()
  @ApiProperty({
    description: "Unique identification number of author",
    type: Number,
    example: 1
  })
  author_id: number;

  constructor(content: string, post_id: number, author_id: number) {
    this.content = content;
    this.postId = post_id;
    this.author_id = author_id;
  }
}
