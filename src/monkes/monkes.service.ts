import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateMonkeDto } from "./dto/create-monke.dto";
import { UpdateMonkeDto } from "./dto/update-monke.dto";
import { Monke, Prisma } from "@prisma/client";
import { PrismaService } from "../prisma.service";
import { UsersService } from "../users/users.service";
import { MonkeEntity } from "./entities/monke.entity";
import { MonkesColorEnum } from "./monkes-color.enum";

@Injectable()
export class MonkesService {
  // baseUrl: string = "https://menemi-web-6-sem.onrender.com/monkes";
  //
  baseUrl: string = "https://localhost:3000/monkes"
  constructor(private prisma: PrismaService, private userService: UsersService) {
  }

  async create(createMonkeDto: CreateMonkeDto): Promise<Monke> {
    let foundOwner = await this.userService.findOne(createMonkeDto.owner_id);
    const data: Prisma.MonkeCreateInput = {
      name: createMonkeDto.name,
      weight: createMonkeDto.weight,
      height: createMonkeDto.height,
      gender: createMonkeDto.gender,
      color: createMonkeDto.color,
      owner: {
        connect: {
          id: foundOwner.id
        }
      }
    };

    return await this.saveMonke(data);
  }

  saveMonke(data: Prisma.MonkeCreateInput): Promise<Monke> {
    return this.prisma.monke.create({
      data
    });
  }

  async findAll(owner_id?: number, current_page?: number) {
    if (current_page == null) {
      current_page = 1;
    }

    if (owner_id == null) {
      return [
        await this.prisma.monke
          .findMany({
            skip: 3 * (current_page - 1),
            take: 3
          })
          .then((x) => x.map((t) => new MonkeEntity(
            t.id,
            t.name,
            t.weight,
            t.height,
            t.gender,
            <MonkesColorEnum>t.color,
            t.ownerId))),
        `${this.baseUrl}?current_page=${+current_page + +1}`
      ];
    }

    owner_id = +owner_id;
    let foundOwner = await this.userService.findOne(owner_id);
    return [
      await this.prisma.monke.findMany({
        where: {
          ownerId: foundOwner.id
        },
        skip: 3 * (current_page - 1),
        take: 3
      }).then((x) => x.map((t) => new MonkeEntity(
        t.id,
        t.name,
        t.weight,
        t.height,
        t.gender,
        <MonkesColorEnum>t.color,
        t.ownerId))),
      `${this.baseUrl}?owner_id=${owner_id}&current_page=${+current_page + +1}`
    ];
  }

  async findOne(id: number) {
    const monke = await this.prisma.monke.findUnique({
      where: { id: id }
    });

    if (monke == null) {
      throw new NotFoundException("Nonexistent Monke");
    }

    return monke;
  }

  async update(id: number, updateMonkeDto: UpdateMonkeDto) {
    return this.prisma.monke.update({
      data: {
        weight: updateMonkeDto.weight,
        height: updateMonkeDto.height,
        ownerId: updateMonkeDto.owner_id
      },
      where: {
        id: id
      }
    });
  }

  async remove(id: number) {
    await this.prisma.monke.delete({
      where: {
        id: id
      }
    });
  }
}
