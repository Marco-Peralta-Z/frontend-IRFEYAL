import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MallaComponent } from './malla.component';

describe('MallaComponent', () => {
  let component: MallaComponent;
  let fixture: ComponentFixture<MallaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MallaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MallaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
