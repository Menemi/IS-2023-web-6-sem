import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseFilters, UseGuards } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags
} from "@nestjs/swagger";
import { PostEntity } from "./entities/post.entity";
import { PrismaExceptionFilter } from "../prisma.exception.filter";
import { AuthGuard } from "../auth/auth.guard";

@Controller("posts")
@ApiTags("posts")
@UseFilters(new PrismaExceptionFilter())
export class PostsController {
  constructor(private readonly postsService: PostsService) {
  }

  /**
   * Create new Post
   * @param createPostDto value to inject
   * @returns created Post
   */
  @ApiCreatedResponse({
    description: "Post created successfully"
  })
  @ApiBadRequestResponse({
    description: "Incorrect arguments to create Post"
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  /**
   * Find all Posts
   * @return array of Posts
   */
  @ApiOkResponse({
    description: "All Posts have been found",
    type: [PostEntity]
  })
  @ApiNotFoundResponse({
    description: "No Posts in the system"
  })
  @ApiQuery({ required: false, name: "author_id" })
  @ApiQuery({ required: false, name: "current_page" })
  @Get()
  findAll(@Query("author_id") author_id?: number,
          @Query("current_page") current_page?: number) {
    return this.postsService.findAll(author_id, current_page);
  }

  /**
   * Find Post by id
   * @param id unique identification number
   * @returns PostEntity
   */
  @ApiOkResponse({
    description: "Post has been found",
    type: PostEntity
  })
  @ApiBadRequestResponse({
    description: "Incorrect request arguments"
  })
  @ApiNotFoundResponse({
    description: "Nonexistent Post"
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.postsService.findOne(+id);
  }

  /**
   * Update some Post's info
   * @param id unique identification number
   * @param updatePostDto value to inject
   * @returns updated Post
   */
  @ApiOkResponse({
    description: "Post updated successfully"
  })
  @ApiBadRequestResponse({
    description: "Incorrect request arguments"
  })
  @ApiNotFoundResponse({
    description: "Nonexistent Post"
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Put(":id")
  update(@Param("id") id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  /**
   * Remove Post
   * @param id unique identification number
   */
  @ApiOkResponse({
    description: "Post removed successfully"
  })
  @ApiBadRequestResponse({
    description: "Incorrect request arguments"
  })
  @ApiNotFoundResponse({
    description: "Nonexistent Post"
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.postsService.remove(+id);
  }
}
