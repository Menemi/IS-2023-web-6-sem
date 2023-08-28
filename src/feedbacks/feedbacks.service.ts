import { Injectable, NotFoundException } from "@nestjs/common";
import { UpdateFeedbackDto } from "./dto/update-feedback.dto";
import { PrismaService } from "../prisma.service";
import { UsersService } from "../users/users.service";
import { Feedback, Prisma } from "@prisma/client";
import { CreateFeedbackDto } from "./dto/create-feedback.dto";
import { FeedbackEntity } from "./entities/feedback.entity";

@Injectable()
export class FeedbacksService {
  // baseUrl: string = "https://menemi-web-6-sem.onrender.com/feedbacks";
  //
  baseUrl: string = "https://localhost:3000/feedbacks"
  constructor(private prisma: PrismaService, private userService: UsersService) {
  }

  async create(createFeedbackDto: CreateFeedbackDto): Promise<Feedback> {
    let foundAuthor = await this.userService.findOne(createFeedbackDto.author_id);
    const data: Prisma.FeedbackCreateInput = {
      content: createFeedbackDto.content,
      rating: createFeedbackDto.rating,
      author: {
        connect: {
          id: foundAuthor.id
        }
      }
    };

    return await this.saveFeedback(data);
  }

  saveFeedback(data: Prisma.FeedbackCreateInput): Promise<Feedback> {
    return this.prisma.feedback.create({
      data
    });
  }

  async findAll(author_id?: number, current_page?: number) {
    if (current_page == null) {
      current_page = 1;
    }

    if (author_id == null) {
      return [
        await this.prisma.feedback
          .findMany({
            skip: 3 * (current_page - 1),
            take: 3
          })
          .then((x) => x.map((t) => new FeedbackEntity(
            t.id,
            t.content,
            t.rating,
            t.authorId))),
        `${this.baseUrl}?current_page=${+current_page + +1}`
      ];
    }

    author_id = +author_id;
    let foundAuthor = await this.userService.findOne(author_id);
    return [
      await this.prisma.feedback.findMany({
        where: {
          authorId: foundAuthor.id
        },
        skip: 3 * (current_page - 1),
        take: 3
      }).then((x) => x.map((t) => new FeedbackEntity(
        t.id,
        t.content,
        t.rating,
        t.authorId))),
      `${this.baseUrl}?author_id=${author_id}&current_page=${+current_page + +1}`
    ];
  }

  async findOne(id: number) {
    const feedback = await this.prisma.feedback.findUnique({
      where: { id: id }
    });

    if (feedback == null) {
      throw new NotFoundException("Nonexistent Feedback");
    }

    return feedback;
  }

  async update(id: number, updateFeedbackDto: UpdateFeedbackDto) {
    return this.prisma.feedback.update({
      data: {
        content: updateFeedbackDto.content,
        rating: updateFeedbackDto.rating
      },
      where: {
        id: id
      }
    });
  }

  async remove(id: number) {
    await this.prisma.feedback.delete({
      where: {
        id: id
      }
    });
  }
}
