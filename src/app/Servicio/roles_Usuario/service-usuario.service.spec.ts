import { TestBed } from '@angular/core/testing';

import { ServiceUsuarioService } from './service-usuario.service';

describe('ServiceUsuarioService', () => {
  let service: ServiceUsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceUsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
