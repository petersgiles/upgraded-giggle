import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserStatisticReportAccessComponent } from './user-statistic-report-access.component';

describe('UserStatisticReportAccessComponent', () => {
  let component: UserStatisticReportAccessComponent;
  let fixture: ComponentFixture<UserStatisticReportAccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserStatisticReportAccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserStatisticReportAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
