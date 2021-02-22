import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
// import { BoardAdminComponent } from './board-admin.component';
// import {AddHeroeComponent} from './add-heroe/add-heroe.component';
// import {HeroeListComponent} from './heroe-list/heroe-list.component';
// import {AuthGuard} from '../_services/auth.guard';
import { AddHeroeComponent } from './add-heroe/add-heroe.component';
import { HeroeDetailComponent } from './heroe-detail/heroe-detail.component';
import { HeroeResolverService } from './heroe-resolver.service';
import { TrainerHeroesComponent } from './trainer-heroes/trainer-heroes.component';
import { TrainerProfileComponent } from './trainer-profile/trainer-profile.component';
import { TrainerComponent } from './trainer.component';

const trainerRoutes: Routes = [
  {
    path: 'profile',
    component: TrainerProfileComponent,
    canActivate:[AuthGuard]
  },
  {
    path: '',
    component: TrainerComponent,
    canActivate: [AuthGuard],
    resolve: [HeroeResolverService],
    children: [
      // {
      //   path: 'profile',
      //   component: TrainerProfileComponent,
      // },

      {
        path: 'new',
        component: AddHeroeComponent,
      },
      {
        path: ':id',
        component: HeroeDetailComponent,
        resolve: [HeroeResolverService],
      },
      {
        path: ':id/new',
        component: AddHeroeComponent,
        resolve: [HeroeResolverService]
      }

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(trainerRoutes)],
  exports: [RouterModule],
})
export class TrainerRoutingModule {}
