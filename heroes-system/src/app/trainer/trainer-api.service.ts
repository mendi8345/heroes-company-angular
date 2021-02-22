import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {env} from 'process';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {environment} from 'src/environments/environment';
import {TokenStorageService} from '../auth/token-storage.service';
import {Heroe} from './heroe.model';
import {TrainerService} from './trainer.service';



const TRAINER_API = environment.API+'/api/trainer/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})}
@Injectable({
  providedIn: 'root'
})
export class TrainerApiService {

  constructor(private http: HttpClient,private trainerService: TrainerService,private tokenService: TokenStorageService) { }
  trainerId :number
  register(trainer): Observable<any> {
    console.log("in registerTrainer")
   return this.http.post(TRAINER_API + 'signup', {
     id: trainer.id,
     name: trainer.name,
   }, httpOptions);
 }
 addHeroe(trainerId,heroe): Observable<any> {
   console.log("inside this.addHeroe()")
   return this.http.post(TRAINER_API + 'addHeroe/'+trainerId, {
     name:heroe.name,
     startDate:heroe.startDate,
     startingPower:heroe.startingPower,
     currentPower:heroe.currentPower,
     ability:heroe.ability,
     suitColors:heroe.suitColors
   }, httpOptions)
 }
 getheroesOfTrainer(trainerId): Observable<any> {
   return this.http.get(TRAINER_API + 'all/'+trainerId).pipe(
     tap(heroes => {
      this.trainerService.setheroes(heroes);
     })
   );

 }
 trainHeroe(heroeId): Observable<any> {
  this.trainerId = this.tokenService.getUser().id;
   return this.http.put(TRAINER_API + 'train/'+this.trainerId+'/'+heroeId, {
   });
 }
 updateHeroe(trainerId,heroId, heroe){

  return this.http.post(TRAINER_API + 'updateHeroe/'+trainerId+"/"+heroId, { name:heroe.name,
    startDate:heroe.startDate,
    startingPower:heroe.startingPower,
    currentPower:heroe.currentPower,
    ability:heroe.ability,
    suitColors:heroe.suitColors }, httpOptions)

}
}
