import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderQuotationsComponent } from './loader-quotations.component';

describe('LoaderQuotationsComponent', () => {
  let component: LoaderQuotationsComponent;
  let fixture: ComponentFixture<LoaderQuotationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoaderQuotationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderQuotationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
