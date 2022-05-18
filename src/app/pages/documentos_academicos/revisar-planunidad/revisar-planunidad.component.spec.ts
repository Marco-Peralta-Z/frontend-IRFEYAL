import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisarPlanunidadComponent } from './revisar-planunidad.component';

describe('RevisarPlanunidadComponent', () => {
  let component: RevisarPlanunidadComponent;
  let fixture: ComponentFixture<RevisarPlanunidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevisarPlanunidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisarPlanunidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
