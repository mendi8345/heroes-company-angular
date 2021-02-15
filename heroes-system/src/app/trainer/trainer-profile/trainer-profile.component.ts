import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from 'src/app/auth/token-storage.service';

@Component({
  selector: 'app-trainer-profile',
  templateUrl: './trainer-profile.component.html',
  styleUrls: ['./trainer-profile.component.css']
})
export class TrainerProfileComponent implements OnInit {

  currentUser: any;

  constructor(private tokenService: TokenStorageService) { }

  ngOnInit() {
    this.currentUser = this.tokenService.getUser();
    console.log(this.currentUser)
  }

}
