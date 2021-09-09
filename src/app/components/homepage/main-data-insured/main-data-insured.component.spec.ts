import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainDataInsuredComponent } from './main-data-insured.component';

describe('MainDataInsuredComponent', () => {
  let component: MainDataInsuredComponent;
  let fixture: ComponentFixture<MainDataInsuredComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainDataInsuredComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainDataInsuredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
