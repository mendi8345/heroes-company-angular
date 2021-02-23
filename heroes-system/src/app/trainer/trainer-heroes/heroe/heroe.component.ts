import { Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {Heroe} from '../../heroe.model';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {
  @Input() heroe: Heroe;
  @Input() index: number;
  isLoading=false

  constructor() { }
  // ngOnChanges(changes: SimpleChanges): void {
  //   this.isLoading=true

  //   setTimeout(() => {
  //     this.isLoading=false
  //   }, 1000);
  // }


  ngOnInit(): void {

  }

}
