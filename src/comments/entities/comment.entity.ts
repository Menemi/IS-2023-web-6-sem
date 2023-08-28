import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CommentEntity {
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
  @IsNotEmpty()
  @ApiProperty({
    description: "Unique identification number of author",
    type: Number,
    example: 1
  })
  authorId: number;

  constructor(id: number, content: string, postId: number, authorId: number) {
    this.id = id;
    this.content = content;
    this.postId = postId;
    this.authorId = authorId;
  }
}
