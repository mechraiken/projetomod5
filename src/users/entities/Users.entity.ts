import { Profiles } from "src/profiles/entities/Profiles.entity";

export class Users{
    name:       String[100];
    email:      String[100];
    password:   String[100];
    cpf:        String[15];
    isAdmin:    boolean;
    //profiles?:  Profiles[];
}