import { 
     Body,
     Controller,
     Delete,
     Get, 
     HttpCode, 
     HttpStatus, 
     Logger, 
     Param, 
     ParseUUIDPipe, 
     Patch, 
     Post,
     Req,
     SetMetadata,
     UseFilters,
     UseGuards, 
    } from "@nestjs/common";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { UserEntity } from "./user.entity";

import { UserService } from "./users.service";
import { UserResponseDto } from "./dtos/user-response.dto";
import { CustomExceptionFilter } from "src/common/filters/custom-exception/custom-exception.filter";
import { AuthGuard } from "src/common/guards/auth/auth.guard";
import { Public } from "src/common/decorators/public.decorator";
import { ConfigService } from "@nestjs/config";

interface EnvironmentVariables {
  PORT: number;
  EMAIL: string;
}

@UseFilters(CustomExceptionFilter)
@Controller('users')
export class UsersController {
  logger: Logger = new Logger(UsersController.name);
    constructor(  
      private readonly configService: ConfigService<EnvironmentVariables>,
      private readonly userService: UserService
      )  {

      //console.log(process.env.DATABASE_HOST);
      console.log(this.configService.get('EMAIL', {infer:true}));
    }
      
    @Public()
    @Get()
    async find(@Req() req: Request): Promise<UserEntity[]>  {
      this.logger.log('Getting all users');
      const users = await this.userService.findUsers();
      this.logger.debug(`Found ${users.length} users`)
      //console.log(req.body)
      //await new Promise((resolve) => setTimeout( 5000));
      //return this.userService.findUsers();
      return users;
    }
    @Public()
    @Get(':id')
    findOne(
        @Param('id', ParseUUIDPipe)
        id: string,
        ) : UserResponseDto {
        
    
        return this.userService.findUserById(id);
       }
    
   // @UseGuards(AuthGuard)
    @Post()
    create(
    @Body()
     createUserDto: CreateUserDto,
     ): UserResponseDto {
       return this.userService.createUser(createUserDto);
    }
    
    @Patch(":id")
    
    update(@Param("id", ParseUUIDPipe) id: string,
     @Body()
     updateUserDto: UpdateUserDto) {
       return this.userService.updateUser(id,updateUserDto);
    }

    @Delete(":id")
    @HttpCode(HttpStatus.NO_CONTENT )
    remove(@Param("id",ParseUUIDPipe) id: string) {
        this.userService.deleteUser(id);
     }
}