import { TestBed } from '@angular/core/testing';

import { ServiceHorarioService } from '../Servicio horario/service-horario.service';

describe('ServiceHorarioService', () => {
  let service: ServiceHorarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceHorarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
