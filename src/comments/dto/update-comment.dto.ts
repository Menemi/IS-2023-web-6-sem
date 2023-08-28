import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateCommentDto } from "./create-comment.dto";
import { IsNotEmpty, IsString } from "class-validator";

export class UpdateCommentDto extends PartialType(CreateCommentDto) {
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

  constructor(content: string) {
    super();
    this.content = content;
  }
}
