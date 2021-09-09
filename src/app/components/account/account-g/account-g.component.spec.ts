import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountGComponent } from './account-g.component';

describe('AccountGComponent', () => {
  let component: AccountGComponent;
  let fixture: ComponentFixture<AccountGComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountGComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
