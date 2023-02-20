import { Injectable } from "@nestjs/common";
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProfilesDto } from "./dto/CreateProfilesDto";
import { Profiles } from "./entities/Profiles.entity";

@Injectable()
export class ProfilesService {
  Profiles:Profiles[] = [];

  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.profiles.findMany();
  }

  findOne(id: number): Promise<Profiles> {
    return this.prisma.profiles.findUnique({ where: { id } });
  }

  create(CreateProfilesDto: CreateProfilesDto) {
    const Profiles:Profiles = {...CreateProfilesDto};

    return this.prisma.profiles.create({
      data: Profiles,
    });

    
  }
}