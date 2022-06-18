import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarPlanunidadComponent } from './generar-planunidad.component';

describe('GenerarPlanunidadComponent', () => {
  let component: GenerarPlanunidadComponent;
  let fixture: ComponentFixture<GenerarPlanunidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerarPlanunidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerarPlanunidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
