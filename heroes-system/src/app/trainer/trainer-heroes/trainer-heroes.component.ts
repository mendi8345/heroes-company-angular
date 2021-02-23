import {AfterViewChecked, Component, DoCheck, OnChanges, OnInit} from '@angular/core';
import {Router, ActivatedRoute, RouterStateSnapshot, RouterState} from '@angular/router';
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
export class TrainerHeroesComponent implements OnInit, DoCheck {

  heroes: Heroe[];
  subscription: Subscription;
  isLoading=false
  newMode=false
  counter=0


  constructor(private trainerService: TrainerService,
    private trainerApiService: TrainerApiService,
    private authService: AuthService,
    private tokenService: TokenStorageService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    const user=this.tokenService.getUser;
    // this.isLoading=true

    this.subscription=this.trainerService.heroesChanged
      .subscribe(
        (heroes: Heroe[]) => {
          this.isLoading=true

          setTimeout(() => {
            this.isLoading=false
          }, 1000);
          this.heroes=heroes;
        }
      );
    this.heroes=this.trainerService.getheroes();
  }
  ngDoCheck() {
    this.newMode=window.location.pathname=="/trainer/new"

  }

  onNewHeroe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
