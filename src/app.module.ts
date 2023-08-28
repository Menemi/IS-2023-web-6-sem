import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { MonkesModule } from "./monkes/monkes.module";
import { PostsModule } from "./posts/posts.module";
import { CommentsModule } from "./comments/comments.module";
import { FeedbacksModule } from "./feedbacks/feedbacks.module";
import { AuthModule } from "./auth/auth.module";
import { GatewayModule } from "./gateway/gateway.module";

@Module({
  imports: [
    UsersModule,
    MonkesModule,
    PostsModule,
    CommentsModule,
    FeedbacksModule,
    AuthModule,
    GatewayModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
