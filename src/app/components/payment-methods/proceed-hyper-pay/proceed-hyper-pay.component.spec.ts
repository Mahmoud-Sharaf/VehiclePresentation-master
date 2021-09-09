import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProceedHyperPayComponent } from './proceed-hyper-pay.component';

describe('ProceedHyperPayComponent', () => {
  let component: ProceedHyperPayComponent;
  let fixture: ComponentFixture<ProceedHyperPayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProceedHyperPayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProceedHyperPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
