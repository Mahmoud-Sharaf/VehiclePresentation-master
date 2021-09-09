import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceDocumentComponent } from './insurance-document.component';

describe('InsuranceDocumentComponent', () => {
  let component: InsuranceDocumentComponent;
  let fixture: ComponentFixture<InsuranceDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsuranceDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
