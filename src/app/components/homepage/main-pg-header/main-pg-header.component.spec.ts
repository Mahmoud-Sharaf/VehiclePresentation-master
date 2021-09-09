import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPgHeaderComponent } from './main-pg-header.component';

describe('MainPgHeaderComponent', () => {
  let component: MainPgHeaderComponent;
  let fixture: ComponentFixture<MainPgHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainPgHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPgHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
