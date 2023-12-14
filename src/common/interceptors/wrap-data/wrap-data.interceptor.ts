import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class WrapDataInterceptor implements NestInterceptor {

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    
    //console.log('Before, Request intercepting....');
    //console.log('Interceptor called ...')
    
    return next.handle().pipe(
      map((data) => {
       // console.log('After, Response intercepting....', data);
        return { response: data };
    }),
    
    );
  }
}
