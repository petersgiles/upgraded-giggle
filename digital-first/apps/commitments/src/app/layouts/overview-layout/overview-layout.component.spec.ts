

import 'core-js/es7/reflect'
import 'zone.js/dist/zone'
import 'zone.js/dist/proxy';
import 'zone.js/dist/async-test';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';
import 'jest-zone-patch' 

import { ConfigureFn, configureTests } from '../../../../../../libs/df-testing'
import { MdcDialog, Overlay } from '@angular-mdc/web'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { OverviewLayoutComponent } from './overview-layout.component'
import { FormBuilder } from '@angular/forms'
import { Store, select} from '@ngrx/store'
import { Router, ActivatedRoute,  ParamMap,  convertToParamMap } from '@angular/router'
import { ExcelService } from '../../services/excel.service'

describe('OverviewLayoutComponent', () => {

  let component: OverviewLayoutComponent;
  let fixture: ComponentFixture<OverviewLayoutComponent>;
  let excelService: ExcelService

  beforeEach(async(() => {
    const configure = (testBed: TestBed) => {
    testBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [OverviewLayoutComponent],
      providers:
      [ 
        FormBuilder, 
        MdcDialog,
        Overlay,
        ExcelService,
        { provide: Store,
          useValue: {
            pipe: jest.fn(),
            dispatch: jest.fn()
          }
         },
         {
          provide: Router,
          useValue: {navigate: jest.fn()}
        },
      ]
    })
   }
   configureTests(configure).then(testBed => {
    fixture = testBed.createComponent(OverviewLayoutComponent);
    component = fixture.componentInstance

    excelService = testBed.get(ExcelService)
   // fixture.detectChanges()
  })
  
  }))
 
  it('should create', () => {
    expect(component).toBeTruthy()
  })

 })

