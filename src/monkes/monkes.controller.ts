import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseFilters, UseGuards } from "@nestjs/common";
import { MonkesService } from "./monkes.service";
import { CreateMonkeDto } from "./dto/create-monke.dto";
import { UpdateMonkeDto } from "./dto/update-monke.dto";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags
} from "@nestjs/swagger";
import { MonkeEntity } from "./entities/monke.entity";
import { PrismaExceptionFilter } from "../prisma.exception.filter";
import { AuthGuard } from "../auth/auth.guard";

@Controller("monkes")
@ApiTags("monkes")
@UseFilters(new PrismaExceptionFilter())
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class MonkesController {
  constructor(private readonly monkesService: MonkesService) {
  }

  /**
   * Create new Monke
   * @param createMonkeDto value to inject
   * @returns created Monke
   */
  @ApiCreatedResponse({
    description: "Monke created successfully"
  })
  @ApiBadRequestResponse({
    description: "Incorrect arguments to create Monke"
  })
  @Post()
  create(@Body() createMonkeDto: CreateMonkeDto) {
    return this.monkesService.create(createMonkeDto);
  }

  /**
   * Find all Monkes
   * @return array of Monkes
   */
  @ApiOkResponse({
    description: "All Monkes have been found",
    type: [MonkeEntity]
  })
  @ApiNotFoundResponse({
    description: "No Monkes in the system"
  })
  @ApiQuery({ required: false, name: "owner_id" })
  @ApiQuery({ required: false, name: "current_page" })
  @Get()
  findAll(@Query("owner_id") owner_id?: number,
          @Query("current_page") current_page?: number) {
    return this.monkesService.findAll(owner_id, current_page);
  }


  /**
   * Find Monke by id
   * @param id unique identification number
   * @returns MonkeEntity
   */
  @ApiOkResponse({
    description: "Monke has been found",
    type: MonkeEntity
  })
  @ApiBadRequestResponse({
    description: "Incorrect request arguments"
  })
  @ApiNotFoundResponse({
    description: "Nonexistent Monke"
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.monkesService.findOne(+id);
  }

  /**
   * Update some Monke's info
   * @param id unique identification number
   * @param updateMonkeDto value to inject
   * @returns updated Monke
   */
  @ApiOkResponse({
    description: "Monke updated successfully"
  })
  @ApiBadRequestResponse({
    description: "Incorrect request arguments"
  })
  @ApiNotFoundResponse({
    description: "Nonexistent Monke"
  })
  @Put(":id")
  update(@Param("id") id: string, @Body() updateMonkeDto: UpdateMonkeDto) {
    return this.monkesService.update(+id, updateMonkeDto);
  }

  /**
   * Remove Monke
   * @param id unique identification number
   */
  @ApiOkResponse({
    description: "Monke removed successfully"
  })
  @ApiBadRequestResponse({
    description: "Incorrect request arguments"
  })
  @ApiNotFoundResponse({
    description: "Nonexistent Monke"
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.monkesService.remove(+id);
  }
}
