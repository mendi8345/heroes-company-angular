import {CommonModule} from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {TrainerComponent} from './trainer.component';
import {AddHeroeComponent} from './add-heroe/add-heroe.component';
import {TrainerRoutingModule} from './trainar-routing.module';
import {HeroeComponent} from './trainer-heroes/heroe/heroe.component';
import {TrainerHeroesComponent} from './trainer-heroes/trainer-heroes.component';
import {TrainerProfileComponent} from './trainer-profile/trainer-profile.component';

import { HeroeDetailComponent } from './heroe-detail/heroe-detail.component';


@NgModule({
  declarations: [
    TrainerComponent,
   TrainerHeroesComponent,
  //  HeroeDetailComponent,
  HeroeComponent,
  AddHeroeComponent,
  TrainerProfileComponent,
  HeroeDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TrainerRoutingModule
  ]
})
export class trainerModule {}
