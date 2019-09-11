 

import { ConfigureFn, configureTests } from '../../../../../../../libs/df-testing'

import { NO_ERRORS_SCHEMA } from '@angular/core'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { ProtectiveMarkingComponent } from './protective-marking.component'
import { FormBuilder } from '@angular/forms'
import {  Overlay } from '@angular-mdc/web'
import { Store} from '@ngrx/store'

describe('ProtectiveMarkingComponent', () => {
  let component: ProtectiveMarkingComponent;
  let fixture: ComponentFixture<ProtectiveMarkingComponent>;

 
  beforeEach(async(() => {
    const configure = (testBed: TestBed) => {
    testBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ProtectiveMarkingComponent],
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
    fixture = testBed.createComponent(ProtectiveMarkingComponent);
    component = fixture.componentInstance

    //fixture.detectChanges() with this there is an error
  })
  
  }))
  const defaultValues = {
    securityClassification: "UNCLASSIFIED",
    dLM: "Sensitive",
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  })

 })
