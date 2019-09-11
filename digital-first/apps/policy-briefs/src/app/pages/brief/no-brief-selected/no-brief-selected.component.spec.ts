 

import { ConfigureFn, configureTests } from '../../../../../../../libs/df-testing'

import { NO_ERRORS_SCHEMA } from '@angular/core'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { NoBriefSelectedComponent } from './no-brief-selected.component'


describe('NoBriefSelectedComponent', () => {
  let component: NoBriefSelectedComponent;
  let fixture: ComponentFixture<NoBriefSelectedComponent>;

 
  beforeEach(async(() => {
    const configure = (testBed: TestBed) => {
    testBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [NoBriefSelectedComponent],
      providers:
      []
    })
   }
   configureTests(configure).then(testBed => {
    fixture = testBed.createComponent(NoBriefSelectedComponent);
    component = fixture.componentInstance

    fixture.detectChanges()
  })
  
  }))

  it('should create', () => {
    expect(component).toBeTruthy();
  })

 })