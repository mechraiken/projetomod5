import { Injectable } from "@nestjs/common";
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUsersDto } from "./dto/CreateUsersDto";
import { Users } from "./entities/Users.entity";
import { handleError } from "src/utils/handle-error.util";
import { Prisma } from "@prisma/client";

@Injectable()
export class UsersService {
  Users:Users[] = [];

  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.users.findMany();
  }

  findOne(id: number): Promise<Users> {
    return this.prisma.users.findUnique({ where: { id } });
  }


  create(CreateUsersDto: CreateUsersDto) {
    const Users:Users = {...CreateUsersDto};

    return this.prisma.users.create({
      data: Users,
    });

  }
}