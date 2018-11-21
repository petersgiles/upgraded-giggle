import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeaffairsComponent } from './homeaffairs.component';

describe('HomeaffairsComponent', () => {
  let component: HomeaffairsComponent;
  let fixture: ComponentFixture<HomeaffairsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeaffairsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeaffairsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
