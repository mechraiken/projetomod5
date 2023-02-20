import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateProfilesDto } from "./dto/CreateProfilesDto";
import { Profiles } from "./entities/Profiles.entity";
import { ProfilesService } from "./profiles.service";

@ApiTags("Profiles")
@Controller("profiles")
export class ProfilesController {
  constructor(private profilesService: ProfilesService) {}

  @Get()
  @ApiOperation({
    summary: "Listar todos os perfis"
  })
  findAll() {
    return this.profilesService.findAll();;
  }

  @Get(":id")
  @ApiOperation({
    summary: "Visualizar um perfil"
  })
  findOne(@Param("id") id: number): Promise<Profiles> {
    return this.profilesService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: "Criar um perfil"
  })
  create(@Body() createProfilesDto: CreateProfilesDto): Promise<Profiles> {
    return this.profilesService.create(createProfilesDto);
  }
}