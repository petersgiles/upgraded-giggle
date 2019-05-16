import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayOrderPageComponent } from './display-order-page.component';

describe('DisplayOrderPageComponent', () => {
  let component: DisplayOrderPageComponent;
  let fixture: ComponentFixture<DisplayOrderPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayOrderPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayOrderPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
