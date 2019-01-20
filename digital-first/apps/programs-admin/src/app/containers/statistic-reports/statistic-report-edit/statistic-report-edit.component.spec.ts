import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticReportEditComponent } from './statistic-report-edit.component';

describe('StatisticReportEditComponent', () => {
  let component: StatisticReportEditComponent;
  let fixture: ComponentFixture<StatisticReportEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticReportEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticReportEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
