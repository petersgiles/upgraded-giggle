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
import { BriefSubscriptionEditorComponent } from './brief-subscription-editor.component'


describe('BriefSubscriptionEditorComponent', () => {
  let component: BriefSubscriptionEditorComponent;
  let fixture: ComponentFixture<BriefSubscriptionEditorComponent>;

 
  beforeEach(async(() => {
    const configure: ConfigureFn = testBed => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [BriefSubscriptionEditorComponent],
      providers:
      []
    })
   }
   configureTests(configure).then(testBed => {
    fixture = TestBed.createComponent(BriefSubscriptionEditorComponent);
    component = fixture.componentInstance

    fixture.detectChanges()
  })
  
  }))

  it('should create', () => {
    expect(component).toBeTruthy();
  })

 })