import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsNumber, IsString } from "class-validator";

export class PostEntity {
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

  @IsArray()
  @ApiProperty({
    description: "An array of comments",
    type: Array,
    default: []
  })
  comments: Comment[];

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
    comments: Comment[] = [],
    author_id: number
  ) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.isPublished = isPublished;
    this.comments = comments;
    this.author_id = author_id;
  }
}
