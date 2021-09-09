import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NationalAddressComponent } from './national-address.component';

describe('NationalAddressComponent', () => {
  let component: NationalAddressComponent;
  let fixture: ComponentFixture<NationalAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NationalAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NationalAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
