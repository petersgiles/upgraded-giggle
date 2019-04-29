import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitmentOverviewLayoutComponent } from './commitment-overview-layout.component';

describe('CommitmentLayoutComponent', () => {
  let component: CommitmentOverviewLayoutComponent;
  let fixture: ComponentFixture<CommitmentOverviewLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommitmentOverviewLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommitmentOverviewLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
