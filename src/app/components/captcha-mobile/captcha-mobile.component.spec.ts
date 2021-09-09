import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaptchaMobileComponent } from './captcha-mobile.component';

describe('CaptchaMobileComponent', () => {
  let component: CaptchaMobileComponent;
  let fixture: ComponentFixture<CaptchaMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaptchaMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaptchaMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
