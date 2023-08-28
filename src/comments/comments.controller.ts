import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseFilters, UseGuards } from "@nestjs/common";
import { CommentsService } from "./comments.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags
} from "@nestjs/swagger";
import { CommentEntity } from "./entities/comment.entity";
import { PrismaExceptionFilter } from "../prisma.exception.filter";
import { AuthGuard } from "../auth/auth.guard";

@Controller("comments")
@ApiTags("comments")
@UseFilters(new PrismaExceptionFilter())
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {
  }

  /**
   * Create new Comment
   * @param createCommentDto value to inject
   * @returns created Comment
   */
  @ApiCreatedResponse({
    description: "Comment created successfully"
  })
  @ApiBadRequestResponse({
    description: "Incorrect arguments to create Comment"
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
  }

  /**
   * Find all Comments
   * @return array of Comments
   */
  @ApiOkResponse({
    description: "All Comments have been found",
    type: [CommentEntity]
  })
  @ApiNotFoundResponse({
    description: "Something went wrong, Comments not found"
  })
  @ApiQuery({ required: false, name: "author_id" })
  @ApiQuery({ required: false, name: "post_id" })
  @ApiQuery({ required: false, name: "current_page" })
  @Get()
  findAll(@Query("author_id") author_id?: number,
          @Query("post_id") post_id?: number,
          @Query("current_page") current_page?: number) {
    return this.commentsService.findAll(author_id, post_id, current_page);
  }

  /**
   * Find Comment by id
   * @param id unique identification number
   * @returns Comment with id: #{id}
   */
  @ApiOkResponse({
    description: "Comment has been found",
    type: CommentEntity
  })
  @ApiBadRequestResponse({
    description: "Incorrect request arguments"
  })
  @ApiNotFoundResponse({
    description: "Nonexistent Comment"
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.commentsService.findOne(+id);
  }

  /**
   * Update some Comment's info
   * @param id unique identification number
   * @param updateCommentDto value to inject
   * @returns CommentEntity
   */
  @ApiOkResponse({
    description: "Comment updated successfully"
  })
  @ApiBadRequestResponse({
    description: "Incorrect request arguments"
  })
  @ApiNotFoundResponse({
    description: "Nonexistent Comment"
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Put(":id")
  update(@Param("id") id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(+id, updateCommentDto);
  }

  /**
   * Remove Comment
   * @param id unique identification number
   */
  @ApiOkResponse({
    description: "Comment removed successfully"
  })
  @ApiBadRequestResponse({
    description: "Incorrect request arguments"
  })
  @ApiNotFoundResponse({
    description: "Nonexistent Comment"
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.commentsService.remove(+id);
  }
}
