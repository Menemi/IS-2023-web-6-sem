import { Module } from "@nestjs/common";
import { FeedbacksService } from "./feedbacks.service";
import { FeedbacksController } from "./feedbacks.controller";
import { PrismaService } from "../prisma.service";
import { UsersService } from "../users/users.service";

@Module({
  controllers: [FeedbacksController],
  providers: [FeedbacksService, UsersService, PrismaService]
})
export class FeedbacksModule {
}
