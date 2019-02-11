import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserStatisticAccessComponent } from './user-statistic-access.component';

describe('UserStatisticAccessComponent', () => {
  let component: UserStatisticAccessComponent;
  let fixture: ComponentFixture<UserStatisticAccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserStatisticAccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserStatisticAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
