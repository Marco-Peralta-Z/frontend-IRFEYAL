import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignaturaPeriodoComponent } from './asignatura-periodo.component';

describe('AsignaturaPeriodoComponent', () => {
  let component: AsignaturaPeriodoComponent;
  let fixture: ComponentFixture<AsignaturaPeriodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignaturaPeriodoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignaturaPeriodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
