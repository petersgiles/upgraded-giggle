import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtectiveMarkingComponent } from './protective-marking.component';

describe('ProtectiveMarkingComponent', () => {
  let component: ProtectiveMarkingComponent;
  let fixture: ComponentFixture<ProtectiveMarkingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProtectiveMarkingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtectiveMarkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
