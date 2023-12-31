import { Module } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { PostsController } from "./posts.controller";
import { PrismaService } from "../prisma.service";
import { UsersService } from "../users/users.service";

@Module({
  controllers: [PostsController],
  providers: [PostsService, UsersService, PrismaService]
})
export class PostsModule {
}
