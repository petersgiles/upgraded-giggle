import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BriefRecommendationActionComponent } from './brief-recommendation-action.component';

describe('BriefRecommendationActionComponent', () => {
  let component: BriefRecommendationActionComponent;
  let fixture: ComponentFixture<BriefRecommendationActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BriefRecommendationActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BriefRecommendationActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
