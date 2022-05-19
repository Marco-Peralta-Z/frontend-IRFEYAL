import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignaturasComponent } from './asignaturas.component';

describe('AsignaturasComponent', () => {
  let component: AsignaturasComponent;
  let fixture: ComponentFixture<AsignaturasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignaturasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignaturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
