import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsString } from "class-validator";

export class PostAbbreviatedEntity {
  @IsNumber()
  @ApiProperty({
    description: "id",
    type: Number,
    example: 1
  })
  id: number;

  @IsString()
  @ApiProperty({
    description: "title",
    type: String,
    example:
      "On the ISS, the Russian crew continues to work and conduct experiments"
  })
  title: string;

  @IsString()
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
  @ApiProperty({
    description: "true - published; false - is in archive",
    type: String,
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

  constructor(
    id: number,
    title: string,
    content: string,
    isPublished: boolean,
    author_id: number
  ) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.isPublished = isPublished;
    this.author_id = author_id;
  }
}
