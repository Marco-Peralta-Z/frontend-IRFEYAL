import { TestBed } from '@angular/core/testing';

import { MallaService } from './malla.service';

describe('MallaService', () => {
  let service: MallaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MallaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
