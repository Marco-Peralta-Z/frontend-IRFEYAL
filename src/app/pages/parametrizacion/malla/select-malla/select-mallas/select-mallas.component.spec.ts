import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectMallasComponent } from './select-mallas.component';

describe('SelectMallasComponent', () => {
  let component: SelectMallasComponent;
  let fixture: ComponentFixture<SelectMallasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectMallasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectMallasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
