import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateUsersDto } from "./dto/CreateUsersDto";
import { Users } from "./entities/Users.entity";
import { UsersService } from "./users.service";

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @ApiOperation({
    summary: "Listar todos os usuários"
  })
  findAll() {
    return this.usersService.findAll();;
  }

  @Get(":id")
  @ApiOperation({
    summary: "Visualizar um usuário"
  })
  findOne(@Param("id") id: number): Promise<Users> {
    return this.usersService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: "Criar um usuário"
  })
  create(@Body() createUsersDto: CreateUsersDto): Promise<Users> {
    return this.usersService.create(createUsersDto);
  }
}