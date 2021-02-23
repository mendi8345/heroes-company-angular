



import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {catchError, tap} from 'rxjs/operators';
import {throwError, BehaviorSubject, Observable} from 'rxjs';

// import {User} from './user.model';
import {environment} from 'src/environments/environment';
import {User} from './user.model';
import {TokenStorageService} from './token-storage.service';
import {TrainerApiService} from '../trainer/trainer-api.service';


const httpOptions={
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};


@Injectable({providedIn: 'root'})
export class AuthService {
  user=new BehaviorSubject<User>(null);
  authApi=environment.API+"/api/auth/"

  private tokenExpirationTimer: any;

  constructor(private http: HttpClient,
    private router: Router,
    private tokenStorage: TokenStorageService,
    private trainerApiService: TrainerApiService) { }

  register(user): Observable<any> {
    return this.http.post(this.authApi+'signup', {
      username: user.username,
      email: user.email,
      password: user.password
    }, httpOptions)
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(resData)
        })
      );
  }

  login(credentials): Observable<any> {
    return this.http.post(
      this.authApi+'signin', {
      username: credentials.username,
      password: credentials.password
    }, httpOptions
    ).pipe(
      catchError(this.handleError),
      tap(resData => {
        this.handleAuthentication(resData)
      })
    );
  }

  private handleAuthentication(user: User) {
    this.user.next(user);
    // console.log(this.user.subscribe)
    // this.autoLogout(expiresIn*1000);
    this.tokenStorage.saveToken(user.accessToken);
    this.tokenStorage.saveUser(user);
    console.log(user)

  }
  private handleError(errorRes: HttpErrorResponse) {
    console.log(errorRes.error.message)

    let errorMessage='An unknown error occurred!';
    if (!errorRes.error) {
      console.log("1")
      return throwError(errorMessage);
    }
    if (errorRes.error.errors!=undefined) {
      console.log("2")

      errorMessage=errorRes.error.errors[0].defaultMessage
      return throwError(errorMessage);
    }
    if (errorRes.error.message) {
      console.log("3")

      errorMessage=errorRes.error.message;
      console.log(errorMessage)
      switch (errorMessage) {
        case 'Error: Unauthorized':
          errorMessage='opsy... username or password is wrong';
          break;
        default:
          break;
      }
      return throwError(errorMessage);
    }
    if (errorRes.error.error.message) {
      errorMessage=errorRes.error.error.message
      return throwError(errorMessage)
    }

  }


}

