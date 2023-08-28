import { Controller, Get, Render, UseInterceptors } from "@nestjs/common";
import { AppInterceptor } from "./app.interceptor";
import { ApiExcludeController } from "@nestjs/swagger";

@Controller()
@UseInterceptors(AppInterceptor)
@ApiExcludeController()
export class AppController {
  @Get(["/index", ""])
  @Render("index")
  index() {
  }

  @Get("/profile/monkes")
  @Render("profile-monkes")
  profileMonkes() {
    return { profile: true };
  }

  @Get("/profile/posts")
  @Render("profile-posts")
  profilePosts() {
    return { profile: true };
  }

  @Get("/profile/comments")
  @Render("profile-comments")
  profileComments() {
    return { profile: true };
  }

  @Get("/profile/feedbacks")
  @Render("profile-feedbacks")
  profileFeedbacks() {
    return { profile: true };
  }

  @Get("/authorization")
  @Render("authorization")
  authorization() {
  }

  @Get("/feedback")
  @Render("feedback")
  feedback() {
  }

  @Get("/forum")
  @Render("forum")
  forum() {
  }

  @Get("/meeting-place-map")
  @Render("meeting-place-map")
  meetingPlaceMap() {
  }

  @Get("/timelines")
  @Render("timelines")
  timelines() {
    return { timelines: true };
  }
}
