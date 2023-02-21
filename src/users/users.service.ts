import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException
} from "@nestjs/common";
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUsersDto } from "./dto/CreateUsersDto";
import { Users } from "./entities/Users.entity";
import { handleError } from "src/utils/handle-error.util";
import { Prisma } from "@prisma/client";
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {
  Users:Users[] = [];

  private userSelect = {
    name:true,
    email:true,
    password:true,
    cpf:true,
    isAdmin:true
  };

  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.users.findMany({
      select: this.userSelect
    });
  }

  async findById(id: number): Promise<Users> {
    const record = await this.prisma.users.findUnique({
      where: { id },
      select: this.userSelect
    });

    if (!record) {
      throw new NotFoundException(`Registro com o ID '${id}' não encontrado.`);
    }

    return record;
  }

  findOne(id: number): Promise<Users> {
    return this.findById(id);
  }


  async create(CreateUsersDto: CreateUsersDto): Promise<Users> {
    const data: Users = {
      ...CreateUsersDto,
      password: await bcrypt.hash(CreateUsersDto.password, 100)
    };
    
    return this.prisma.users.create({
      data, select: this.userSelect
    }).catch(handleError);

    
  
  }
}