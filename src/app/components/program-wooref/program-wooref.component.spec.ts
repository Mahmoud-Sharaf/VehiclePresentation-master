import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramWoorefComponent } from './program-wooref.component';

describe('ProgramWoorefComponent', () => {
  let component: ProgramWoorefComponent;
  let fixture: ComponentFixture<ProgramWoorefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramWoorefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramWoorefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
