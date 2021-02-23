import {Component, DoCheck, OnInit} from '@angular/core';
import {ActivatedRoute, Router, Params} from '@angular/router';
import {TrainerApiService} from '../trainer-api.service';
import {Heroe} from '../heroe.model';
import {TrainerService} from '../trainer.service';
import {timeout} from 'rxjs/operators';

@Component({
  selector: 'app-heroe-detail',
  templateUrl: './heroe-detail.component.html',
  styleUrls: ['./heroe-detail.component.css']
})
export class HeroeDetailComponent implements OnInit ,DoCheck {

  heroe: Heroe;
  id: number;
  error: string=null
  isLoading=false

  constructor(private trainerService: TrainerService,
    private trainerApiService: TrainerApiService,
    private route: ActivatedRoute,
    private router: Router) {
  }
  ngDoCheck(): void {
    this.ngOnInit()
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id=+params['id'];
          this.heroe=this.trainerService.getHeroe(this.id);
        }
      );
  }



  onEditHeroe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
  trainHeroe() {
    this.isLoading=true
    this.trainerApiService.trainHeroe(this.heroe.id).subscribe(
      res => {
        this.trainerService.updateHeroe(this.id, res)
        this.heroe=res
      },
      err => {
        this.error=err.error.message
      })

    setTimeout(() => {
      this.isLoading=false
    }, 900);
  }
  onHandleError() {
    this.error=null;
  }

}
