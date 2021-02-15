import {HttpInterceptor, HttpRequest, HttpHandler, HTTP_INTERCEPTORS} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {TokenStorageService} from "./token-storage.service";

const TOKEN_HEADER_KEY = 'Authorization';       // for Spring Boot back-end

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private token: TokenStorageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log("in intersepter")
    let authReq = req;
    const token = this.token.getToken();
    console.log(token)
    if (token != null) {
      // for Spring Boot back-end
      authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });


    }
    return next.handle(authReq);
  }
}
//  providers : [
//   { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
// ];
