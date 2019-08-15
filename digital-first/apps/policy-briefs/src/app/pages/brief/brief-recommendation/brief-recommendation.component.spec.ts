import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BriefRecommendationComponent } from './brief-recommendation.component';

describe('BriefRecommendationComponent', () => {
  let component: BriefRecommendationComponent;
  let fixture: ComponentFixture<BriefRecommendationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BriefRecommendationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BriefRecommendationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
