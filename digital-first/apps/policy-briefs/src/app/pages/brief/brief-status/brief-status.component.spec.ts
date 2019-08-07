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
import { BriefStatusComponent } from './brief-status.component'
import { FormBuilder } from '@angular/forms'
import {  Overlay } from '@angular-mdc/web'
import { Store} from '@ngrx/store'
import { statuslist } from '../mock-data'
import { Observable, BehaviorSubject } from 'rxjs'


describe('BriefStatusComponent', () => {
  let component: BriefStatusComponent;
  let fixture: ComponentFixture<BriefStatusComponent>;
  let documentStatusList$: Observable<any>
  
 
  beforeEach(async(() => {
    const configure: ConfigureFn = testBed => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [BriefStatusComponent],
      providers:
      [ 
        FormBuilder, 
        Overlay,
        { provide: Store,
          useValue: {
            pipe: jest.fn(),
            dispatch: jest.fn()
          }
         },
      ]
    })
   }
   configureTests(configure).then(testBed => {
    fixture = TestBed.createComponent(BriefStatusComponent);
    component = fixture.componentInstance
    documentStatusList$ = new BehaviorSubject(statuslist)
    component.form.patchValue(defaultValues)

    fixture.detectChanges()
  })
  
  }))

  const defaultValues = {
    status: "1"
  }

 
  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should show statuses in Behavior Subject', () => {
    documentStatusList$.subscribe(statuses => {
      expect(statuses[0].caption).toBe('In Draft')
      expect(statuses[0].colour).toBe('Pink')
    })
    
  })

 })