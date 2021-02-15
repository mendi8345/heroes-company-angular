
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from '../auth/auth.guard';
// import { BoardAdminComponent } from './board-admin.component';
// import {AddHeroeComponent} from './add-heroe/add-heroe.component';
// import {HeroeListComponent} from './heroe-list/heroe-list.component';
// import {AuthGuard} from '../_services/auth.guard';
import {AddHeroeComponent} from './add-heroe/add-heroe.component';
import {HeroeResolverService} from './heroe-resolver.service';
import {TrainerHeroesComponent} from './trainer-heroes/trainer-heroes.component';
import {TrainerProfileComponent} from './trainer-profile/trainer-profile.component';
import {TrainerComponent} from './trainer.component';

const trainerRoutes: Routes = [

  { path: '', component: TrainerComponent,canActivate:[AuthGuard],resolve:[HeroeResolverService]},
  { path: 'new', component: AddHeroeComponent },
  { path: 'profile', component: TrainerProfileComponent },
  { path: 'all', component: TrainerHeroesComponent ,resolve:[HeroeResolverService]}

];

@NgModule({
  imports: [RouterModule.forChild(trainerRoutes)],
  exports: [RouterModule]
})
export class TrainerRoutingModule { }

