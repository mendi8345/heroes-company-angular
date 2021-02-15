import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  // { path: 'home', component: HomeComponent },
  // { path: 'auth/login', component: LoginComponent },
  // { path: 'auth/register', component: RegisterComponent },
  // { path: 'profile', component: ProfileComponent },
  // { path: '', redirectTo: 'home', pathMatch: 'full' }
  {
    path: "auth",
    loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule)
  },
  {
    path: "trainer",
    loadChildren: () => import("./trainer/trainer.module").then(m => m.trainerModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
