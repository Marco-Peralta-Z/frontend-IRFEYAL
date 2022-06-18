import { TestBed } from '@angular/core/testing';

import { ParaleloeService } from './paraleloe.service';

describe('ParaleloeService', () => {
  let service: ParaleloeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParaleloeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
