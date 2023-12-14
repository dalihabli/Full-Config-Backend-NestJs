import { ClassSerializerInterceptor, MiddlewareConsumer, Module, NestModule, RequestMethod, ValidationPipe } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { APP_INTERCEPTOR, APP_PIPE } from "@nestjs/core";
import { WrapDataInterceptor } from "./common/interceptors/wrap-data/wrap-data.interceptor";
import { LoggerMiddleware } from "./common/middlewares/logger/logger.middleware";
import { CommonModule } from "./common/common.module";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import ormConfig from "./config/orm.config";
import ormConfigProd from "./config/orm.config.prod";



@Module({
    imports: [ConfigModule.forRoot({
      envFilePath: 
      process.env.NODE_ENV ==  'development'
      ? '.development.env'
      : '.staging.env',
      isGlobal:true,
      //load:{ormConfig, ormConfigProd},
      //ignoreEnvFile: true,

     
     }),
     //TypeOrmModule.forRootAsync({
      //useFactory: process.env.NODE_ENV == 'development' ? ormConfig : ormConfigProd,
     //}),

     UsersModule,
    CommonModule,
    ],
    providers:[
        //{provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor },
        {provide: APP_PIPE, useClass: ValidationPipe },
        //{provide: APP_INTERCEPTOR, useClass:WrapDataInterceptor },
    ],
    })  
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer):any {
    consumer
    .apply(LoggerMiddleware)
    .exclude(
      { path: 'users/:id', method: RequestMethod.PATCH},
      { path: 'users/:id', method: RequestMethod.DELETE},
    )


    .forRoutes('*');
    
  }
}