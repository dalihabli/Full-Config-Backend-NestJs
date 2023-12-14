import { Inject, Injectable, NotFoundException, Scope } from "@nestjs/common";
import { UserEntity } from "./user.entity";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { CreateUserDto } from "./dtos/create-user.dto";
import { v4 as uuid } from "uuid"
import { APP_NAME, USER_HABITS } from "./user.constants";
import { UserResponseDto } from "./dtos/user-response.dto";


 
@Injectable()
export class UserService{
    constructor (
        @Inject(APP_NAME) private appName:string,
        @Inject(USER_HABITS) private userHabits: string[],
        ) {
            //console.log(this.appName);
            //console.log(this.userHabits)
            //console.log('UserService instantiated');
        }
    
    private users: UserEntity[] = [];

    findUsers(): UserEntity[]{
       // console.log(this.appName);
        return this.users;
    }

    findUserById(id:string): UserResponseDto {
        const user = this.users.find((user) => user.id == id);
        if (!user) {
            throw new NotFoundException(`not found user ${id}`);
        }
        return new UserResponseDto(user)

    }

    createUser(createUserDto:CreateUserDto): UserResponseDto{
        const newUser : UserEntity = {
            ...createUserDto,
            id: uuid(), 
        }
        this.users.push(newUser);

          return new UserResponseDto(newUser) ;
    }

    updateUser(id:string, updateUserDto:UpdateUserDto): UserEntity{
        const index = this.users.findIndex((user) => user.id == id);
        this.users[index] = {...this.users[index], ...updateUserDto};
        return this.users[index];
    }

    deleteUser(id:string) : void{
        this.users = this.users.filter((user) => user.id != id);

    }


}