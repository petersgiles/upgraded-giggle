import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoBriefSelectedComponent } from './no-brief-selected.component';

describe('NoBriefSelectedComponent', () => {
  let component: NoBriefSelectedComponent;
  let fixture: ComponentFixture<NoBriefSelectedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoBriefSelectedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoBriefSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
