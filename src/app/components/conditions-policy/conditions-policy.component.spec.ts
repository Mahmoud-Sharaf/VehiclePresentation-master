import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionsPolicyComponent } from './conditions-policy.component';

describe('ConditionsPolicyComponent', () => {
  let component: ConditionsPolicyComponent;
  let fixture: ComponentFixture<ConditionsPolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConditionsPolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConditionsPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
