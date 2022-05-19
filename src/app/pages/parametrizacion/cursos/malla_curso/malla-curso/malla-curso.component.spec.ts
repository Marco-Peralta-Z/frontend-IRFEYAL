import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MallaCursoComponent } from './malla-curso.component';

describe('MallaCursoComponent', () => {
  let component: MallaCursoComponent;
  let fixture: ComponentFixture<MallaCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MallaCursoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MallaCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
