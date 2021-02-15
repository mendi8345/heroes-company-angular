import { TestBed } from '@angular/core/testing';

import { TrainerApiService } from './trainer-api.service';

describe('TrainerApiService', () => {
  let service: TrainerApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrainerApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
