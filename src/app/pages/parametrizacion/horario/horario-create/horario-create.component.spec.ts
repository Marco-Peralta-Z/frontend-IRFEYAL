import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorarioCreateComponent } from './horario-create.component';

describe('HorarioCreateComponent', () => {
  let component: HorarioCreateComponent;
  let fixture: ComponentFixture<HorarioCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HorarioCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HorarioCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
