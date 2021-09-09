import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationDialogBuynowComponent } from './confirmation-dialog-buynow.component';

describe('ConfirmationDialogComponent', () => {
  let component: ConfirmationDialogBuynowComponent;
  let fixture: ComponentFixture<ConfirmationDialogBuynowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationDialogBuynowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationDialogBuynowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
