import { TestBed } from '@angular/core/testing';

import { CorridaTerapiaWillService } from './corrida-terapia-will.service';

describe('CorridaTerapiaWillService', () => {
  let service: CorridaTerapiaWillService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorridaTerapiaWillService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
