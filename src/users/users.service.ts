import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { PrismaService } from "../prisma.service";
import { Prisma, User } from "@prisma/client";
import { UserAbbreviatedEntity } from "./entities/user.abbreviated.entity";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  // baseUrl: string = "https://menemi-web-6-sem.onrender.com/users";
  //
  baseUrl: string = "https://localhost:3000/users"
  constructor(private prisma: PrismaService) {
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(createUserDto.password, salt);
    const data: Prisma.UserCreateInput = {
      name: createUserDto.name,
      email: createUserDto.email,
      password: password,
      isAdmin: createUserDto.is_admin
    };

    return await this.saveUser(data);
  }

  saveUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data
    });
  }

  async findAll(current_page?: number) {
    if (current_page == null) {
      current_page = 1;
    }

    return [
      await this.prisma.user
        .findMany({
          skip: 3 * (current_page - 1),
          take: 3
        })
        .then((x) => x.map((t) => new UserAbbreviatedEntity(t.id, t.name, t.email, t.isAdmin))),
      `${this.baseUrl}?current_page=${+current_page + +1}`
    ];
  }

  async findOne(id: number) {
    const user: User = await this.prisma.user.findUnique({
      where: { id: id }
    });

    if (user == null) {
      throw new NotFoundException("Nonexistent User");
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin
    };
  }

  async findOneByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email: email }
    });

    if (user == null) {
      throw new NotFoundException("Nonexistent User");
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(updateUserDto.password, salt);
    return this.prisma.user.update({
      data: {
        name: updateUserDto.name,
        email: updateUserDto.email,
        password: password,
        isAdmin: updateUserDto.is_admin
      },
      where: {
        id: id
      }
    });
  }

  async remove(id: number) {
    await this.prisma.user.delete({
      where: {
        id: id
      }
    });
  }
}
