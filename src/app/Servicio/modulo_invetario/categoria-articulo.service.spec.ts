import { TestBed } from '@angular/core/testing';

import { CategoriaArticuloService } from './categoria-articulo.service';

describe('CategoriaArticuloService', () => {
  let service: CategoriaArticuloService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriaArticuloService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
