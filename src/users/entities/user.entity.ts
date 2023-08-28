import { ApiProperty } from "@nestjs/swagger";
import { Comment, Feedback, Monke, Post } from "@prisma/client";
import { IsArray, IsBoolean, IsNumber, IsString } from "class-validator";

export class UserEntity {
  @IsNumber()
  @ApiProperty({
    description: "unique identification number",
    type: Number,
    example: 1
  })
  id: number;

  @IsString()
  @ApiProperty({
    description: "name",
    type: String,
    example: "Titov Daniil"
  })
  name: string;

  @IsString()
  @ApiProperty({
    description: "email",
    type: String,
    example: "danila.titov1210@yandex.ru"
  })
  email: string;

  @IsBoolean()
  @ApiProperty({
    description: "false - common user; true - admin",
    type: Boolean,
    default: false
  })
  is_admin: boolean;

  @IsString()
  @ApiProperty({
    description: "password",
    type: String,
    example: "1234567890"
  })
  password: string;

  @IsArray()
  @ApiProperty({
    description: "An array of User's posts",
    type: Array,
    default: []
  })
  posts: Post[];

  @IsArray()
  @ApiProperty({
    description: "An array of User's feedbacks",
    type: Array,
    default: []
  })
  feedbacks: Feedback[];

  @IsArray()
  @ApiProperty({
    description: "An array of User's comments",
    type: Array,
    default: []
  })
  comments: Comment[];

  @IsArray()
  @ApiProperty({
    description: "An array of User's monkes / pet",
    type: Array,
    default: []
  })
  monkes: Monke[];

  constructor(
    id: number,
    name: string,
    email: string,
    password: string,
    is_admin: boolean = false,
    posts: Post[] = [],
    comments: Comment[] = [],
    feedback: Feedback[] = [],
    monkes: Monke[] = []
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.is_admin = is_admin;
    this.password = password;
    this.posts = posts;
    this.comments = comments;
    this.feedbacks = feedback;
    this.monkes = monkes;
  }
}
