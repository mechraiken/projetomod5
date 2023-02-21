import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException
} from "@nestjs/common";
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProfilesDto } from "./dto/CreateProfilesDto";
import { Profiles } from "./entities/Profiles.entity";
import { Prisma } from "@prisma/client";
import * as bcrypt from 'bcrypt';
import { handleError } from "src/utils/handle-error.util";

@Injectable()
export class ProfilesService {
  Profiles:Profiles[] = [];

  private profileSelect = {
    title:true,
    imageURL:true,
    userId:true
  };

  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.profiles.findMany({
      select: this.profileSelect
    });
  }

  async findById(id: number): Promise<Profiles> {
    const record = await this.prisma.profiles.findUnique({
      where: { id },
      select: this.profileSelect
    });

    if (!record) {
      throw new NotFoundException(`Registro com o ID '${id}' não encontrado.`);
    }

    return record;
  }

  findOne(id: number): Promise<Profiles> {
    return this.findById(id);
  }

  async create(CreateProfilesDto: CreateProfilesDto): Promise<Profiles> {
    const data: Prisma.ProfilesCreateInput = {
      user: {
        connect: {
          id: CreateProfilesDto.userId
        }
      },
      title: CreateProfilesDto.title,
      imageURL: CreateProfilesDto.imageURL
    }
    
    return this.prisma.profiles.create({data}).catch(handleError);

    
  }
}