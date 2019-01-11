import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticAddComponent } from './statistic-add.component';

describe('StatisticAddComponent', () => {
  let component: StatisticAddComponent;
  let fixture: ComponentFixture<StatisticAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
