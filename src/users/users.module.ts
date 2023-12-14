import { Injectable, Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UserService } from "./users.service";
import { APP_NAME, USER_HABITS } from "./user.constants";
import { ConfigModule } from '@nestjs/config';

class MockUserService{
    findUsers(){
        return ['user1','user2'];
    }
}
abstract class ConfingService {}
class DevelopmentConfig extends ConfingService {}
class ProductionConfigService extends ConfingService {}
@Injectable()
class UserHabitsFactory {
    getHabits(){
        return ['eat', 'sleep', 'code'];
    }
}

@Injectable()
class LoggerService {
    constructor(private readonly userService: UserService) {}
}
const LoggerServiceAliasProvider = {
    provide: 'LoggerServiceAliasProvider',
    useExisting: LoggerService,
};


@Injectable()
class DataseConnection {
   async connectToDB(): Promise<string> {
    return await Promise.resolve('connectToDB successfully ');
   }
}

@Module({
    

controllers: [UsersController],
    providers: [

        UserService,
        UserHabitsFactory,
        LoggerService,
        LoggerServiceAliasProvider,
        DataseConnection,
    {
       provide: APP_NAME,
      useValue: 'Nest demo api',

    },
    {
        provide:ConfingService,
        useClass:
           process.env.NODE_ENV == 'development'
           ? DevelopmentConfig
           : ProductionConfigService,
    },
    {
    provide: USER_HABITS ,
    useFactory: async(
        userHabits: UserHabitsFactory,
        dbConnection: DataseConnection
        ) => {
        const dbStatus = await dbConnection.connectToDB()  
       // console.log(dbStatus);
        
        return userHabits.getHabits()
    },
    inject: [UserHabitsFactory, DataseConnection],
   },
  ], 
  
  exports: [USER_HABITS],
})
export class UsersModule {}