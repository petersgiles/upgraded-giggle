import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BriefStatusComponent } from './brief-status.component';

describe('BriefStatusComponent', () => {
  let component: BriefStatusComponent;
  let fixture: ComponentFixture<BriefStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BriefStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BriefStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
