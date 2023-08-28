import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { PrismaService } from "../prisma.service";
import { UsersService } from "../users/users.service";
import { Comment, Prisma } from "@prisma/client";
import { PostsService } from "../posts/posts.service";
import { CommentEntity } from "./entities/comment.entity";

@Injectable()
export class CommentsService {
  // baseUrl: string = "https://menemi-web-6-sem.onrender.com/comments";
  //
  baseUrl: string = "https://localhost:3000/comments"
  constructor(private prisma: PrismaService, private userService: UsersService, private postService: PostsService) {
  }

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    let foundAuthor = await this.userService.findOne(createCommentDto.author_id);
    let foundPost = await this.postService.findOne(createCommentDto.postId);
    const data: Prisma.CommentCreateInput = {
      content: createCommentDto.content,
      post: {
        connect: {
          id: foundPost.id
        }
      },
      author: {
        connect: {
          id: foundAuthor.id
        }
      }
    };

    return await this.saveComment(data);
  }

  saveComment(data: Prisma.CommentCreateInput): Promise<Comment> {
    return this.prisma.comment.create({
      data
    });
  }

  async findAll(author_id?: number, post_id?: number, current_page?: number) {
    if (current_page == null) {
      current_page = 1;
    }

    if (author_id == null && post_id == null) {
      return [
        await this.prisma.comment
          .findMany({
            skip: 3 * (current_page - 1),
            take: 3
          })
          .then((x) => x.map((t) => new CommentEntity(
            t.id,
            t.content,
            t.postId,
            t.authorId))),
        `${this.baseUrl}?current_page=${+current_page + +1}`
      ];
    } else if (author_id != null && post_id == null) {
      author_id = +author_id;
      let foundAuthor = await this.userService.findOne(author_id);
      return [
        await this.prisma.comment.findMany({
          where: {
            authorId: foundAuthor.id
          },
          skip: 3 * (current_page - 1),
          take: 3
        }).then((x) => x.map((t) => new CommentEntity(
          t.id,
          t.content,
          t.postId,
          t.authorId))),
        `${this.baseUrl}?author_id=${author_id}&current_page=${+current_page + +1}`
      ];
    } else if (author_id == null && post_id != null) {
      post_id = +post_id;
      let foundPost = await this.postService.findOne(post_id);
      return [
        await this.prisma.comment.findMany({
          where: {
            postId: foundPost.id
          },
          skip: 3 * (current_page - 1),
          take: 3
        }).then((x) => x.map((t) => new CommentEntity(
          t.id,
          t.content,
          t.postId,
          t.authorId))),
        `${this.baseUrl}?post_id=${post_id}&current_page=${+current_page + +1}`
      ];
    }

    author_id = +author_id;
    post_id = +post_id;
    let foundAuthor = await this.userService.findOne(author_id);
    let foundPost = await this.postService.findOne(post_id);
    return [
      await this.prisma.comment.findMany({
        where: {
          authorId: foundAuthor.id,
          postId: foundPost.id
        }
      }).then((x) => x.map((t) => new CommentEntity(
        t.id,
        t.content,
        t.postId,
        t.authorId))),
      `${this.baseUrl}?author_id=${author_id}&post_id=${post_id}&current_page=${+current_page + +1}`
    ];
  }

  async findOne(id: number) {
    const comment = await this.prisma.comment.findUnique({
      where: { id: id }
    });

    if (comment == null) {
      throw new NotFoundException("Nonexistent Comment");
    }

    return comment;
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    return this.prisma.comment.update({
      data: {
        content: updateCommentDto.content
      },
      where: {
        id: id
      }
    });
  }

  async remove(id: number) {
    await this.prisma.comment.delete({
      where: {
        id: id
      }
    });
  }
}
