import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainDataInsuredMobileComponent } from './main-data-insured-mobile.component';

describe('MainDataInsuredMobileComponent', () => {
  let component: MainDataInsuredMobileComponent;
  let fixture: ComponentFixture<MainDataInsuredMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainDataInsuredMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainDataInsuredMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
