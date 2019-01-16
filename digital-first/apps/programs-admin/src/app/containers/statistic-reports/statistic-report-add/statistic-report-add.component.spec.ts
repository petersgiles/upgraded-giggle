import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticReportAddComponent } from './statistic-report-add.component';

describe('StatisticReportAddComponent', () => {
  let component: StatisticReportAddComponent;
  let fixture: ComponentFixture<StatisticReportAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticReportAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticReportAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
