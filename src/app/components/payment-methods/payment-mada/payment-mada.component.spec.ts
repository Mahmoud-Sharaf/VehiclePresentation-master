import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentMadaComponent } from './payment-mada.component';

describe('PaymentMadaComponent', () => {
  let component: PaymentMadaComponent;
  let fixture: ComponentFixture<PaymentMadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentMadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentMadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
