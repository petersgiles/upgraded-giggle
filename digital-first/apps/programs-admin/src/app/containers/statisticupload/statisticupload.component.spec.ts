import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticuploadComponent } from './statisticupload.component';

describe('StatisticuploadComponent', () => {
  let component: StatisticuploadComponent;
  let fixture: ComponentFixture<StatisticuploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticuploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
