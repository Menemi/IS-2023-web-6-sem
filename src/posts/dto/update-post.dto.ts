import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreatePostDto } from "./create-post.dto";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "title",
    type: String,
    example:
      "On the ISS, the Russian crew continues to work and conduct experiments"
  })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "content",
    type: String,
    example:
      "On the ISS, the Russian part of the Expedition 68 crew " +
      "continues to carry out planned work and experiments.\nOn Thursday, " +
      "March 23, 2023, the astronauts conducted several experiments:"
  })
  content: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    description: "true - published; false - is in archive",
    type: String,
    example: false,
    default: false
  })
  isPublished: boolean;

  constructor(title: string, content: string, isPublished: boolean) {
    super();
    this.title = title;
    this.content = content;
    this.isPublished = isPublished;
  }
}
