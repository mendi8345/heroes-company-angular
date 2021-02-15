import { Component, OnInit } from '@angular/core';
import {FormGroup, FormArray, FormControl, Validators} from '@angular/forms';
import {ActivatedRoute, Router, Params} from '@angular/router';
import {TokenStorageService} from 'src/app/auth/token-storage.service';
import {TrainerApiService} from '../trainer-api.service';

@Component({
  selector: 'app-add-heroe',
  templateUrl: './add-heroe.component.html',
  styleUrls: ['./add-heroe.component.css']
})
export class AddHeroeComponent implements OnInit {

  id: number;
  editMode = false;
  heroeForm: FormGroup;

  get ingredientsControls() {
    return (this.heroeForm.get('ingredients') as FormArray).controls;
  }

  constructor(
    private route: ActivatedRoute,
    private trainerApiService: TrainerApiService,
    private tokenService: TokenStorageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  onSubmit() {
    if (this.editMode) {
      // this.heroeService.updateHeroe(this.id, this.heroeForm.value);
    } else {
      this.trainerApiService.addHeroe(this.tokenService.getUser().id,this.heroeForm.value);
    }
    this.onCancel();
  }




  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private initForm() {
    let heroeName = '';
    // let heroeImagePath = '';
    let heroeAbility = '';
    let heroeCurrentPower = '';
    let heroeStartingPower = '';
    let heroeStartDate = '';
    let heroeSuitColors = '';

    // if (this.editMode) {
    //   const heroe = this.heroeService.getHeroe(this.id);
    //   heroeName = heroe.name;
    //   heroeAbility = heroe.ability;
    //   heroeCurrentPower = heroe.currentPower;
    //   heroeStartingPower = heroe.startingPower;
    //   heroeStartDate = heroe.startDate;
    //   heroeSuitColors = heroe.suitColors;

    // }

    this.heroeForm = new FormGroup({
      name: new FormControl(heroeName, Validators.required),
      ability: new FormControl(heroeAbility, Validators.required),
      currentPower: new FormControl(heroeCurrentPower, Validators.required),
      startDate: new FormControl(heroeStartDate, Validators.required),
      startingPower: new FormControl(heroeStartingPower, Validators.required),
      suitColors: new FormControl(heroeSuitColors, Validators.required),
    });
  }

}
