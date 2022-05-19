import { TestBed } from '@angular/core/testing';

import { ServicereporteService } from './servicereporte.service';

describe('ServicereporteService', () => {
  let service: ServicereporteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicereporteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
