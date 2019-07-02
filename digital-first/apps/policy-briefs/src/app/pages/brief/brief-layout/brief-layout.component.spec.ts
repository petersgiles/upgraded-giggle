import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BriefLayoutComponent } from './brief-layout.component';

describe('BriefLayoutComponent', () => {
  let component: BriefLayoutComponent;
  let fixture: ComponentFixture<BriefLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BriefLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BriefLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
