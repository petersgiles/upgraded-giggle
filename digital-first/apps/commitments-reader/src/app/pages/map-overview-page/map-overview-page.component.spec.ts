import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapOverviewPageComponent } from './map-overview-page.component';

describe('MapOverviewPageComponent', () => {
  let component: MapOverviewPageComponent;
  let fixture: ComponentFixture<MapOverviewPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapOverviewPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapOverviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
