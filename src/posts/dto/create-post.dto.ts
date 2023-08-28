import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreatePostDto {
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

  @IsNumber()
  @ApiProperty({
    description: "Unique identification number of author",
    type: Number,
    example: 1
  })
  author_id: number;

  constructor(title: string, content: string, isPublished: boolean, author_id: number) {
    this.title = title;
    this.content = content;
    this.isPublished = isPublished;
    this.author_id = author_id;
  }
}
