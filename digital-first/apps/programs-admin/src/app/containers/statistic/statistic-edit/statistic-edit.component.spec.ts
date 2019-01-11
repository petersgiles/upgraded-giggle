import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticEditComponent } from './statistic-edit.component';

describe('StatisticEditComponent', () => {
  let component: StatisticEditComponent;
  let fixture: ComponentFixture<StatisticEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
