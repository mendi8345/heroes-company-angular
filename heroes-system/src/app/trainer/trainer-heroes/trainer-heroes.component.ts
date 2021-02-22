import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {AuthService} from 'src/app/auth/auth.service';
import {TokenStorageService} from 'src/app/auth/token-storage.service';
import {User} from 'src/app/auth/user.model';
import {TrainerApiService} from '../trainer-api.service';
import {TrainerService} from '../trainer.service';
import {Heroe} from '../heroe.model';

@Component({
  selector: 'app-trainer-heroes',
  templateUrl: './trainer-heroes.component.html',
  styleUrls: ['./trainer-heroes.component.css']
})
export class TrainerHeroesComponent implements OnInit {

  heroes: Heroe[];
  subscription: Subscription;

  constructor(private trainerService: TrainerService,
    private trainerApiService: TrainerApiService,
    private authService: AuthService,
    private tokenService: TokenStorageService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    const user =this.tokenService.getUser;
    console.log(user)

    this.subscription = this.trainerService.heroesChanged
      .subscribe(
        (heroes: Heroe[]) => {
          this.heroes = heroes;
        }
      );
    this.heroes = this.trainerService.getheroes();
    // const user =this.tokenService.getUser;
    // let id=user.id;
    //  this.trainerApiService.getheroesOfTrainer(id);

  }

  onNewHeroe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
