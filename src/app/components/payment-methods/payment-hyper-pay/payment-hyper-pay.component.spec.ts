import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentHyperPayComponent } from './payment-hyper-pay.component';

describe('PaymentHyperPayComponent', () => {
  let component: PaymentHyperPayComponent;
  let fixture: ComponentFixture<PaymentHyperPayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentHyperPayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentHyperPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
