import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MallaCreateComponent } from './malla-create.component';

describe('MallaCreateComponent', () => {
  let component: MallaCreateComponent;
  let fixture: ComponentFixture<MallaCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MallaCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MallaCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
