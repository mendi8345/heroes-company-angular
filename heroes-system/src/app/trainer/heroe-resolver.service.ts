import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {TokenStorageService} from '../auth/token-storage.service';
import {TrainerApiService} from './trainer-api.service';
import {Heroe} from './heroe.model';
import {TrainerService} from './trainer.service';

@Injectable({
  providedIn: 'root'
})
export class HeroeResolverService implements Resolve<Heroe[]>  {

  constructor(private trainerApi: TrainerApiService,private trainerService: TrainerService,private tokenService:TokenStorageService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any[]|Observable<any[]>|Promise<any[]> {
    const heroes = this.trainerService.getheroes();
    console.log(heroes)
    if (heroes.length === 0) {
      console.log("heroes.length === 0",heroes.length === 0)
      return this.trainerApi.getheroesOfTrainer( this.tokenService.getUser().id)
    } else {
      console.log(heroes)
      return heroes;
    }



  }

}
