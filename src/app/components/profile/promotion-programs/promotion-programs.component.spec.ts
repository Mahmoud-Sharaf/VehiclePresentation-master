import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionProgramsComponent } from './promotion-programs.component';

describe('PromotionProgramsComponent', () => {
  let component: PromotionProgramsComponent;
  let fixture: ComponentFixture<PromotionProgramsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromotionProgramsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionProgramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
