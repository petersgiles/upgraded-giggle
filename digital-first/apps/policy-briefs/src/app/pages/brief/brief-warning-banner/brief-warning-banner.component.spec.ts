import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BriefWarningBannerComponent } from './brief-warning-banner.component';

describe('BriefWarningBannerComponent', () => {
  let component: BriefWarningBannerComponent;
  let fixture: ComponentFixture<BriefWarningBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BriefWarningBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BriefWarningBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
