import {
  Component,
  ComponentFactoryResolver,
  ViewChild,
  OnDestroy
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import {tap} from 'rxjs/internal/operators/tap';
import {TrainerApiService} from '../trainer/trainer-api.service';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  trainer: {id,name} = null;
  // @ViewChild(PlaceholderDirective, { static: false }) alertHost: PlaceholderDirective;

  private closeSub: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private trainerApiService: TrainerApiService
  ) {}


  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const username = form.value.username;
    const password = form.value.password;

    let authObs: Observable<any>;
    this.isLoading = true;

    if (this.isLoginMode) {
      authObs = this.authService.login({username, password});
    } else {
      authObs = this.authService.register({username,email, password})
      console.log("1");
    }
    authObs.subscribe(
      resData => {
        if(!this.isLoginMode){
          const id=resData.id
          const name=resData.username
           this.trainer={id, name}

        console.log(resData);
        // this.isLoading = false;
        this.signpTrainer(this.trainer)

      }else
      this.router.navigate(['/trainer']);
    },
      errorMessage => {
        // this.error = errorMessage.error.errors[0].defaultMessage;
        this.error = errorMessage
        this.isLoading = false;
      }
    );
    form.reset();

  }


  onHandleError() {
    this.error = null;
  }
   signpTrainer (trainer:{id,name}) {
     this.trainerApiService.register(trainer).subscribe(
            data => {
              console.log(data)
              this.router.navigate(['/trainer']);
            },
            err => {
              console.log(err);
            });
  }

  ngOnDestroy() {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }
}
