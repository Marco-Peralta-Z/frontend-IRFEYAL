import { TestBed } from '@angular/core/testing';

import { ServiceregistroService } from './serviceregistro.service';

describe('ServiceregistroService', () => {
  let service: ServiceregistroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceregistroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
