import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerHeroesComponent } from './trainer-heroes.component';

describe('TrainerHeroesComponent', () => {
  let component: TrainerHeroesComponent;
  let fixture: ComponentFixture<TrainerHeroesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainerHeroesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerHeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
