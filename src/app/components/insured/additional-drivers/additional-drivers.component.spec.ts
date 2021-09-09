import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalDriversComponent } from './additional-drivers.component';

describe('AdditionalDriversComponent', () => {
  let component: AdditionalDriversComponent;
  let fixture: ComponentFixture<AdditionalDriversComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdditionalDriversComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalDriversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
