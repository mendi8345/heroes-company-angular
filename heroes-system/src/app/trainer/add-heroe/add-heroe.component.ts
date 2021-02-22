import {Component, OnInit} from '@angular/core';
import {FormGroup, FormArray, FormControl, Validators} from '@angular/forms';
import {ActivatedRoute, Router, Params} from '@angular/router';
import {TokenStorageService} from 'src/app/auth/token-storage.service';
import {TrainerApiService} from '../trainer-api.service';
import {Heroe} from '../heroe.model';
import {TrainerService} from '../trainer.service';

@Component({
  selector: 'app-add-heroe',
  templateUrl: './add-heroe.component.html',
  styleUrls: ['./add-heroe.component.css']
})
export class AddHeroeComponent implements OnInit {

  index: number;
  editMode=false;
  heroeForm: FormGroup;
  trainerId=this.tokenService.getUser().id;
  title: any

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private trainerApiService: TrainerApiService,
    private trainerService: TrainerService,
    private tokenService: TokenStorageService
  ) { }
  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.index=params['id'];
      this.editMode=params['id']!=null;
      console.log(this.trainerService.getHeroe(this.index))
      this.initForm();
      console.log(this.heroeForm.value)
      this.title=this.editMode==true? "update hero":"add hero";
    });
  }

  onSubmit() {
    if (this.editMode) {
      this.trainerApiService.updateHeroe(this.trainerId, this.trainerService.getHeroe(this.index).id, this.heroeForm.value)
        .subscribe(
          res => {
            this.trainerService.updateHeroe(this.index, this.heroeForm.value)
            console.log("update sucsses")
          }, err => {
            console.log(err)
          })

    } else {
      console.log("inSubmit")
      this.trainerApiService.addHeroe(this.tokenService.getUser().id, this.heroeForm.value).subscribe(
        data => {
          this.trainerService.addHeroe(data);
        },
        err => {
          console.log(err.error.message)
          alert(err.error.message)
        }
      );
    }
    this.onCancel();
  }




  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {
    let heroeId=0;
    let heroeName='';
    // let heroeImagePath = '';
    let heroeAbility='';
    let heroeCurrentPower='';
    let heroeStartingPower='';
    let heroeStartDate='';
    let heroeSuitColors='';

    if (this.editMode) {
      const heroe=this.trainerService.getHeroe(this.index);
      heroeId=heroe.id;
      heroeName=heroe.name;
      heroeAbility=heroe.ability;
      heroeCurrentPower=heroe.currentPower;
      heroeStartingPower=heroe.startingPower;
      heroeStartDate=heroe.startDate;
      heroeSuitColors=heroe.suitColors;

    }

    this.heroeForm=new FormGroup({
      id: new FormControl(heroeId),
      name: new FormControl(heroeName, Validators.required),
      ability: new FormControl(heroeAbility, Validators.required),
      currentPower: new FormControl(heroeCurrentPower, Validators.required),
      startDate: new FormControl(heroeStartDate, Validators.required),
      startingPower: new FormControl(heroeStartingPower, Validators.required),
      suitColors: new FormControl(heroeSuitColors, Validators.required),
    });
  }

}
