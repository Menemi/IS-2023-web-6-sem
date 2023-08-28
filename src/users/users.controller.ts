import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseFilters, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags
} from "@nestjs/swagger";
import { UserEntity } from "./entities/user.entity";
import { UserAbbreviatedEntity } from "./entities/user.abbreviated.entity";
import { PrismaExceptionFilter } from "../prisma.exception.filter";
import { AuthGuard } from "../auth/auth.guard";

@Controller("users")
@ApiTags("users")
@UseFilters(new PrismaExceptionFilter())
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  /**
   * Register new User in a system
   * @param createUserDto value to inject
   * @returns created User
   */
  @ApiCreatedResponse({
    description: "User registered successfully"
  })
  @ApiBadRequestResponse({
    description: "Incorrect arguments to register User"
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  /**
   * Find all Users
   * @return array of registered Users
   */
  @ApiOkResponse({
    description: "All Users have been found",
    type: [UserAbbreviatedEntity]
  })
  @ApiNotFoundResponse({
    description: "No Users in the system"
  })
  @ApiQuery({ required: false, name: "current_page" })
  @Get()
  findAll(@Query("current_page") current_page?: number) {
    return this.usersService.findAll(current_page);
  }

  /**
   * Find User by id
   * @param id unique identification number
   * @returns registered User
   */
  @ApiOkResponse({
    description: "User has been found",
    type: UserEntity
  })
  @ApiBadRequestResponse({
    description: "Incorrect request arguments"
  })
  @ApiNotFoundResponse({
    description: "Nonexistent User"
  })
  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.usersService.findOne(+id);
  }

  /**
   * Update some User's info
   * @param id unique identification number
   * @param updateUserDto value to inject
   * @returns updated User
   */
  @ApiOkResponse({
    description: "User updated successfully"
  })
  @ApiBadRequestResponse({
    description: "Incorrect request arguments"
  })
  @ApiNotFoundResponse({
    description: "Nonexistent User"
  })
  @Put(":id")
  update(@Param("id") id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  /**
   * Remove User
   * @param id unique identification number
   */
  @ApiOkResponse({
    description: "User removed successfully"
  })
  @ApiBadRequestResponse({
    description: "Incorrect request arguments"
  })
  @ApiNotFoundResponse({
    description: "Nonexistent User"
  })
  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.usersService.remove(+id);
  }
}
