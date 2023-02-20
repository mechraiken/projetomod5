import { ApiProperty } from "@nestjs/swagger";


export class CreateUsersDto{
    @ApiProperty({
        description: "Nome do usuário",
        example: "John Doe"
    })
    name:       String[100];
    @ApiProperty({
        description: "email do usuário",
        example: "JohnDoe@email.com"
    })
    email:      String[100];
    @ApiProperty({
        description: "senha do usuário",
        example: "12345"
    })
    password:   String[100];
    @ApiProperty({
        description: "cpf do usuário",
        example: "999.999.999-99"
    })
    cpf:        String[15];
    @ApiProperty({
        description: "Usuário administrador?",
        example: "true | false"
    })
    isAdmin:    boolean;
    //profiles:   string[];
}