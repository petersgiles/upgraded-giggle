import 'core-js/es7/reflect'
import 'zone.js/dist/zone'
import 'zone.js/dist/proxy';
import 'zone.js/dist/async-test';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';
import 'jest-zone-patch' 

import { ConfigureFn, configureTests } from '../../../../../../libs/df-testing'

import { NO_ERRORS_SCHEMA } from '@angular/core'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { HomeComponent } from './home.component'


describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

 
  beforeEach(async(() => {
    const configure = (testBed: TestBed)=> {
    testBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [HomeComponent],
      providers:
      []
    })
   }
   configureTests(configure).then(testBed => {
    fixture = testBed.createComponent(HomeComponent);
    component = fixture.componentInstance
  })
  
  }))

  it('should create', () => {
    expect(component).toBeTruthy();
  })

 })