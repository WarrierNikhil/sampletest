import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthService } from '../shared/auth.service';

@Injectable()
export class AuthinterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next:HttpHandler) {
    const authToken=this.authService.getToken();
    const authRequest=req.clone({
      headers:req.headers.set("Authorization","Bearer "+authToken)
    });
    return next.handle(authRequest);
  }

  constructor(private authService:AuthService) { }
}
