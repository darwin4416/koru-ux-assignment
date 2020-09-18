import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImmunizationAlertComponent } from './immunization-alert.component';

describe('ImmunizationAlertComponent', () => {
  let component: ImmunizationAlertComponent;
  let fixture: ComponentFixture<ImmunizationAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImmunizationAlertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImmunizationAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
