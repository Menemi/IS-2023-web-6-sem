import { Module } from "@nestjs/common";
import { CommentsService } from "./comments.service";
import { CommentsController } from "./comments.controller";
import { PrismaService } from "../prisma.service";
import { UsersService } from "../users/users.service";
import { PostsService } from "../posts/posts.service";

@Module({
  controllers: [CommentsController],
  providers: [CommentsService, UsersService, PostsService, PrismaService]
})
export class CommentsModule {
}
