import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Heroe} from './heroe.model';



@Injectable({
  providedIn: 'root'
})
export class TrainerService {

  heroesChanged = new Subject<Heroe[]>();


private heroes: Heroe[] = [];

  constructor() {
   }





   getHeroe(index: number) {
     return this.heroes[index];
   }

   addHeroe(heroe: Heroe) {
     this.heroes.push(heroe);
     this.heroesChanged.next(this.heroes.slice());
   }

   updateHeroe(index: number, newHeroe: Heroe) {
     this.heroes[index] = newHeroe;
     this.heroesChanged.next(this.heroes.slice());
   }

   deleteHeroe(index: number) {
     this.heroes.splice(index, 1);
     this.heroesChanged.next(this.heroes.slice());
   }

   setheroes(heroes: Heroe[]) {
    this.heroes = heroes;
    this.heroesChanged.next(heroes);
  }

    getheroes() {
    return this.heroes.slice();
  }



}
