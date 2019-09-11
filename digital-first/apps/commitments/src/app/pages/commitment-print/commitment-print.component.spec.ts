import { configureTests } from '../../../../../../libs/df-testing'

import { NO_ERRORS_SCHEMA } from '@angular/core'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { CommitmentPrintComponent } from './commitment-print.component'
import { FormBuilder } from '@angular/forms'
import { Router, ActivatedRoute, convertToParamMap } from '@angular/router'
import { Store } from '@ngrx/store'
import { MdcDialog, Overlay, MdcSnackbar } from '@angular-mdc/web'
import { of } from 'rxjs'
import { Location } from '@angular/common'
import { RouterTestingModule } from '@angular/router/testing'

describe('CommitmentPrintComponent', () => {
  let component: CommitmentPrintComponent
  let fixture: ComponentFixture<CommitmentPrintComponent>

  beforeEach(async(() => {
    const configure = (testBed: TestBed) => {
      testBed.configureTestingModule({
        schemas: [NO_ERRORS_SCHEMA],
        declarations: [CommitmentPrintComponent],
        imports: [RouterTestingModule],
        providers: [
          FormBuilder,
          MdcDialog,
          MdcSnackbar,
          Overlay,
          Location,
          {
            provide: Router,
            useValue: { get: jest.fn() }
          },
          {
            provide: Store,
            useValue: {
              pipe: jest.fn(),
              dispatch: jest.fn()
            }
          },
          {
            provide: ActivatedRoute,
            useValue: { paramMap: of(convertToParamMap({ id: '' })) }
          }
        ]
      })
    }
    configureTests(configure).then(testBed => {
      fixture = testBed.createComponent(CommitmentPrintComponent)
      component = fixture.componentInstance
    })
  }))

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
