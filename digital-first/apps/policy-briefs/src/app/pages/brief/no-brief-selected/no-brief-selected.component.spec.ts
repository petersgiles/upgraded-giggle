import 'core-js/es7/reflect'
import 'zone.js/dist/zone'
import 'zone.js/dist/proxy';
import 'zone.js/dist/async-test';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';
import 'jest-zone-patch' 

import { ConfigureFn, configureTests } from '../../../../../../../libs/df-testing'

import { NO_ERRORS_SCHEMA } from '@angular/core'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { NoBriefSelectedComponent } from './no-brief-selected.component'


describe('NoBriefSelectedComponent', () => {
  let component: NoBriefSelectedComponent;
  let fixture: ComponentFixture<NoBriefSelectedComponent>;

 
  beforeEach(async(() => {
    const configure: ConfigureFn = testBed => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [NoBriefSelectedComponent],
      providers:
      []
    })
   }
   configureTests(configure).then(testBed => {
    fixture = TestBed.createComponent(NoBriefSelectedComponent);
    component = fixture.componentInstance

    fixture.detectChanges()
  })
  
  }))

  it('should create', () => {
    expect(component).toBeTruthy();
  })

 })