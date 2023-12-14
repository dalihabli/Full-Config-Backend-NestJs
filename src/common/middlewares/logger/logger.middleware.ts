import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response, request } from 'express';
import { UserService } from 'src/users/users.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  //constructor(private readonly userServoce:UserService){}


  use(req: Request, res: Response, next: NextFunction) {
    
    console.log('Logger middleware...');
    next();
  }
}

//export const loggerMiddleware = ( 
  //req: Request,
  //res: Response, 
  //next: NextFunction,
  //) => {
  //console.log('function Logger middleware...');
  //next();
//};