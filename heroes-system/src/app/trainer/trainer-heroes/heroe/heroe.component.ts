import { Component, Input, OnInit } from '@angular/core';
import {Heroe} from '../../heroe.model';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {
  @Input() heroe: Heroe;
  @Input() index: number;

  constructor() { }

  ngOnInit(): void {
  }

}
