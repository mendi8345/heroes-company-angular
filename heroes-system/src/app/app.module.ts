import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
// import { AuthComponent } from './auth/auth.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {TrainerComponent} from './trainer/trainer.component';
import {trainerModule} from './trainer/trainer.module';
import {authInterceptorProviders} from './trainer/trainer-profile/auth.interceptor';
import {SharedModule} from './shared/shared.module';
import {RouterState, RouterStateSnapshot} from '@angular/router';
// import { AuthInterceptor }from'./_helpers/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    trainerModule,


  ],
  providers: [authInterceptorProviders ],
  bootstrap: [AppComponent]
})
export class AppModule { }
