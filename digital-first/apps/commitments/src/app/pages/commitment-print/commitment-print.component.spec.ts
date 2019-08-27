



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
import { CommitmentPrintComponent } from './commitment-print.component'
import { FormBuilder } from '@angular/forms'
import { Router, ActivatedRoute,  ParamMap,  convertToParamMap } from '@angular/router'
import { Store, select} from '@ngrx/store'
import { MdcDialog, Overlay,  MdcSnackbar } from '@angular-mdc/web'
import {Observable, of } from 'rxjs'
import { Location } from '@angular/common'
import { RouterTestingModule } from '@angular/router/testing'

describe('CommitmentPrintComponent', () => {
  let component: CommitmentPrintComponent;
  let fixture: ComponentFixture<CommitmentPrintComponent>;
  let router: Router


  beforeEach(async(() => {
    const configure: ConfigureFn = testBed => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [CommitmentPrintComponent],
      imports: [ RouterTestingModule ],
      providers:
      [ 
        FormBuilder, 
        MdcDialog,
        MdcSnackbar,
        Overlay,
        Location,
        {
          provide: Router,
          useValue: {get: jest.fn()}
        },
        { provide: Store,
          useValue: {
            pipe: jest.fn(),
            dispatch: jest.fn()
          }
         },
        { provide: ActivatedRoute, useValue: { paramMap: of(convertToParamMap({ id: '' }))}},
      ]
      
    })
   }
   configureTests(configure).then(testBed => {
    fixture = TestBed.createComponent(CommitmentPrintComponent);
    component = fixture.componentInstance
   // fixture.detectChanges()
  })
  
  }))
 
  it('should create', () => {
    expect(component).toBeTruthy()
  })

 })

