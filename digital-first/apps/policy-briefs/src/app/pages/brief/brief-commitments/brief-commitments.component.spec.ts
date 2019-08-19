import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BriefCommitmentsComponent } from './brief-commitments.component';

describe('BriefCommitmentsComponent', () => {
  let component: BriefCommitmentsComponent;
  let fixture: ComponentFixture<BriefCommitmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BriefCommitmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BriefCommitmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
