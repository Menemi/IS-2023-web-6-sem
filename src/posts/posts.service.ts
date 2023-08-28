import { Injectable, NotFoundException } from "@nestjs/common";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { PrismaService } from "../prisma.service";
import { UsersService } from "../users/users.service";
import { Post, Prisma } from "@prisma/client";
import { PostAbbreviatedEntity } from "./entities/post.abbreviated.entity";

@Injectable()
export class PostsService {
  // baseUrl: string = "https://menemi-web-6-sem.onrender.com/posts";
  //
  baseUrl: string = "https://localhost:3000/posts"
  constructor(private prisma: PrismaService, private userService: UsersService) {
  }

  async create(createPostDto: CreatePostDto): Promise<Post> {
    let foundAuthor = await this.userService.findOne(createPostDto.author_id);
    const data: Prisma.PostCreateInput = {
      title: createPostDto.title,
      content: createPostDto.content,
      isPublished: createPostDto.isPublished,
      author: {
        connect: {
          id: foundAuthor.id
        }
      }
    };

    return await this.savePost(data);
  }

  savePost(data: Prisma.PostCreateInput): Promise<Post> {
    return this.prisma.post.create({
      data
    });
  }

  async findAll(author_id?: number, current_page?: number) {
    if (current_page == null) {
      current_page = 1;
    }

    if (author_id == null) {
      return [
        await this.prisma.post
          .findMany({
            skip: 3 * (current_page - 1),
            take: 3
          })
          .then((x) => x.map((t) => new PostAbbreviatedEntity(
            t.id,
            t.title,
            t.content,
            t.isPublished,
            t.authorId))),
        `${this.baseUrl}?current_page=${+current_page + +1}`
      ];
    }

    author_id = +author_id;
    let foundAuthor = await this.userService.findOne(author_id);
    return [
      await this.prisma.post.findMany({
        where: {
          authorId: foundAuthor.id
        },
        skip: 3 * (current_page - 1),
        take: 3
      }).then((x) => x.map((t) => new PostAbbreviatedEntity(
        t.id,
        t.title,
        t.content,
        t.isPublished,
        t.authorId))),
      `${this.baseUrl}?author_id=${author_id}&current_page=${+current_page + +1}`
    ];
  }

  async findOne(id: number) {
    const post = await this.prisma.post.findUnique({
      where: { id: id }
    });

    if (post == null) {
      throw new NotFoundException("Nonexistent Post");
    }

    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    return this.prisma.post.update({
      data: {
        title: updatePostDto.title,
        content: updatePostDto.content,
        isPublished: updatePostDto.isPublished
      },
      where: {
        id: id
      }
    });
  }

  async remove(id: number) {
    await this.prisma.post.delete({
      where: {
        id: id
      }
    });
  }
}
