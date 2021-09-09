import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProceedMadaComponent } from './proceed-mada.component';

describe('ProceedMadaComponent', () => {
  let component: ProceedMadaComponent;
  let fixture: ComponentFixture<ProceedMadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProceedMadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProceedMadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
