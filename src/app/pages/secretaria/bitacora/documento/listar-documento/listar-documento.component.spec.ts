import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarDocumentoComponent } from './listar-documento.component';

describe('ListarDocumentoComponent', () => {
  let component: ListarDocumentoComponent;
  let fixture: ComponentFixture<ListarDocumentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarDocumentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
