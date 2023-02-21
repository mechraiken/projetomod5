import { ApiProperty } from "@nestjs/swagger";

export class CreateProfilesDto{
    @ApiProperty({
      description: "Título do perfil",
      example: "John Doe"
    })
    title         :String[100];
    @ApiProperty({
      description: "URL da imagem"
    })
    imageURL      :String[255];
    @ApiProperty({
      description: "Id do usuário",
      example: "1"
    })
    userId?       :number;
  }