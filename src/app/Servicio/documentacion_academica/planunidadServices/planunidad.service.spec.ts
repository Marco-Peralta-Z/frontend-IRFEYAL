import { TestBed } from '@angular/core/testing';

import { PlanunidadService } from './planunidad.service';

describe('PlanunidadService', () => {
  let service: PlanunidadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanunidadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
