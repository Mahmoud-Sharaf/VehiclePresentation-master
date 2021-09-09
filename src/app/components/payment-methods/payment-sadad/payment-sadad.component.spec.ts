import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentSadadComponent } from './payment-sadad.component';

describe('PaymentSadadComponent', () => {
  let component: PaymentSadadComponent;
  let fixture: ComponentFixture<PaymentSadadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentSadadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentSadadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
