import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewQutationsComponent } from './new-qutations.component';

describe('NewQutationsComponent', () => {
  let component: NewQutationsComponent;
  let fixture: ComponentFixture<NewQutationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewQutationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewQutationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
