import { TestBed } from '@angular/core/testing';

import { ServicedocumentacionacademicaService } from './servicedocumentacionacademica.service';

describe('ServicedocumentacionacademicaService', () => {
  let service: ServicedocumentacionacademicaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicedocumentacionacademicaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
