import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.moudule';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { WrapDataInterceptor } from './common/interceptors/wrap-data/wrap-data.interceptor';
import { TimeoutInterceptor } from './common/interceptors/wrap-data/timeout.interceptor';
import { CustomExceptionFilter } from './common/filters/custom-exception/custom-exception.filter';
import { AuthGuard } from './common/guards/auth/auth.guard';
import { LoggerMiddleware } from './common/middlewares/logger/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe(
    {whitelist: true, 
    forbidNonWhitelisted: true ,
    transform:true,
    transformOptions:{enableImplicitConversion:true},
      
  }),
  );
  //app.useGlobalFilters(new CustomExceptionFilter());
  // app.useGlobalInterceptors( 
  // new WrapDataInterceptor(),
  // new TimeoutInterceptor(),
  // );
  //app.useGlobalGuards(new AuthGuard());
    //app.use(new LoggerMiddleware());

  await app.listen(3000);
}
bootstrap();
