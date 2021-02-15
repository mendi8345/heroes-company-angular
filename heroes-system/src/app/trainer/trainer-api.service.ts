import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {TrainerService} from './trainer.service';



const TRAINER_API = 'http://localhost:8080/api/trainer/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})}
@Injectable({
  providedIn: 'root'
})
export class TrainerApiService {

  constructor(private http: HttpClient,private trainerService: TrainerService) { }

  register(trainer): Observable<any> {
    console.log("in registerTrainer")
   return this.http.post(TRAINER_API + 'signup', {
     id: trainer.id,
     name: trainer.name,
   }, httpOptions);
 }
 addHeroe(trainerId,heroe): Observable<any> {
   return this.http.post(TRAINER_API + 'addHeroe/'+trainerId, {
     name:heroe.name,
     startDate:heroe.startDate,
     startingPower:heroe.startingPower,
     currentPower:heroe.currentPower,
     ability:heroe.ability,
     suitColors:heroe.suitColors
   }, httpOptions);
 }
 getheroesOfTrainer(trainerId): Observable<any> {
   return this.http.get(TRAINER_API + 'all/'+trainerId).pipe(
     tap(heroes => {
      this.trainerService.setheroes(heroes);
     })
   );

 }
 trainHeroe(heroeId): Observable<any> {
   return this.http.put(TRAINER_API + 'train/'+heroeId, {
   });
 }
}
