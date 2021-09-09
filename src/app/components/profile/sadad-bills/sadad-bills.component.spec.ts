import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SadadBillsComponent } from './sadad-bills.component';

describe('SadadBillsComponent', () => {
  let component: SadadBillsComponent;
  let fixture: ComponentFixture<SadadBillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SadadBillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SadadBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
