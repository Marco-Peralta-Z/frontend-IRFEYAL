import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarDocumentoComponent } from './agregar-documento.component';

describe('AgregarDocumentoComponent', () => {
  let component: AgregarDocumentoComponent;
  let fixture: ComponentFixture<AgregarDocumentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarDocumentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
