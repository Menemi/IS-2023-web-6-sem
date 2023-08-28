import { Module } from "@nestjs/common";
import { MonkesService } from "./monkes.service";
import { MonkesController } from "./monkes.controller";
import { PrismaService } from "../prisma.service";
import { UsersService } from "../users/users.service";

@Module({
  controllers: [MonkesController],
  providers: [MonkesService, UsersService, PrismaService]
})
export class MonkesModule {
}
