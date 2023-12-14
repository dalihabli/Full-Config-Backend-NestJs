import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from 'src/common/decorators/public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
constructor(private reflector: Reflector)  {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const jwt = 
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'

    const isPublic = this.reflector.get<boolean>(
      IS_PUBLIC_KEY,
       context.getHandler()
    );
    if (isPublic) {
      return true;
    }
   const ctx = context.switchToHttp();
   const req = ctx.getRequest<Request>();

   const token =req.header('Authorization')
   ? req.header("Authorization").split('')[1] 
   : '';
   
   if(token !== jwt){
    throw new UnauthorizedException('invalid token..');
   }
   return true;
      
    
  }
}
