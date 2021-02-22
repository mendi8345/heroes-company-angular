import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, Params} from '@angular/router';
import {TrainerApiService} from '../trainer-api.service';
import {Heroe} from '../heroe.model';
import {TrainerService} from '../trainer.service';

@Component({
  selector: 'app-heroe-detail',
  templateUrl: './heroe-detail.component.html',
  styleUrls: ['./heroe-detail.component.css']
})
export class HeroeDetailComponent implements OnInit {

  heroe: Heroe;
  id: number;

  constructor(private trainerService: TrainerService,
    private trainerApiService: TrainerApiService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.heroe = this.trainerService.getHeroe(this.id);
        }
      );
  }



  onEditHeroe() {
    this.router.navigate(['new'], {relativeTo: this.route});
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }
  trainHeroe() {
    this.trainerApiService.trainHeroe(this.heroe.id).subscribe(
      res=>{
this.trainerService.updateHeroe(this.id,res)
this.heroe=res
    },
    err=>{
      console.log(err.error.message)
      alert(err.error.message)
          })
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }
  // trainHeroe


}
