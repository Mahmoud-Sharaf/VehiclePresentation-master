import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationAddTicketComponent } from './confirmation-add-ticket.component';

describe('ConfirmationAddTicketComponent', () => {
  let component: ConfirmationAddTicketComponent;
  let fixture: ComponentFixture<ConfirmationAddTicketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationAddTicketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationAddTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
