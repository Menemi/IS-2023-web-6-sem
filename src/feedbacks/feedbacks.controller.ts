import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseFilters, UseGuards } from "@nestjs/common";
import { FeedbacksService } from "./feedbacks.service";
import { CreateFeedbackDto } from "./dto/create-feedback.dto";
import { UpdateFeedbackDto } from "./dto/update-feedback.dto";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags
} from "@nestjs/swagger";
import { FeedbackEntity } from "./entities/feedback.entity";
import { PrismaExceptionFilter } from "../prisma.exception.filter";
import { AuthGuard } from "../auth/auth.guard";

@Controller("feedbacks")
@ApiTags("feedbacks")
@UseFilters(new PrismaExceptionFilter())
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class FeedbacksController {
  constructor(private readonly feedbacksService: FeedbacksService) {
  }

  /**
   * Create new Feedback
   * @param createFeedbackDto value to inject
   * @returns created Feedback
   */
  @ApiCreatedResponse({
    description: "Feedback created successfully"
  })
  @ApiBadRequestResponse({
    description: "Incorrect arguments to create Feedback"
  })
  @Post()
  create(@Body() createFeedbackDto: CreateFeedbackDto) {
    return this.feedbacksService.create(createFeedbackDto);
  }

  /**
   * Find all Feedbacks
   * @return array of Feedbacks
   */
  @ApiOkResponse({
    description: "All Feedbacks have been found",
    type: [FeedbackEntity]
  })
  @ApiNotFoundResponse({
    description: "No Feedbacks in the system"
  })
  @ApiQuery({ required: false, name: "author_id" })
  @ApiQuery({ required: false, name: "current_page" })
  @Get()
  findAll(@Query("author_id") author_id?: number,
          @Query("current_page") current_page?: number) {
    return this.feedbacksService.findAll(author_id, current_page);
  }

  /**
   * Find Feedback by id
   * @param id unique identification number
   * @returns FeedbackEntity
   */
  @ApiOkResponse({
    description: "Feedback has been found",
    type: FeedbackEntity
  })
  @ApiBadRequestResponse({
    description: "Incorrect request arguments"
  })
  @ApiNotFoundResponse({
    description: "Nonexistent Feedback"
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.feedbacksService.findOne(+id);
  }

  /**
   * Update some Feedback's info
   * @param id unique identification number
   * @param updateFeedbackDto value to inject
   * @returns updated Feedback
   */
  @ApiOkResponse({
    description: "Feedback updated successfully"
  })
  @ApiBadRequestResponse({
    description: "Incorrect request arguments"
  })
  @ApiNotFoundResponse({
    description: "Nonexistent Feedback"
  })
  @Put(":id")
  update(
    @Param("id") id: string,
    @Body() updateFeedbackDto: UpdateFeedbackDto
  ) {
    return this.feedbacksService.update(+id, updateFeedbackDto);
  }

  /**
   * Remove Feedback
   * @param id unique identification number
   */
  @ApiOkResponse({
    description: "Feedback removed successfully"
  })
  @ApiBadRequestResponse({
    description: "Incorrect request arguments"
  })
  @ApiNotFoundResponse({
    description: "Nonexistent Feedback"
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.feedbacksService.remove(+id);
  }
}
