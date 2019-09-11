import { configureTests } from '../../../../../../libs/df-testing'
import { MdcDialog, Overlay } from '@angular-mdc/web'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { OverviewLayoutComponent } from './overview-layout.component'
import { FormBuilder } from '@angular/forms'
import { Store } from '@ngrx/store'
import { Router } from '@angular/router'
import { ExcelService } from '../../services/excel.service'

describe('OverviewLayoutComponent', () => {
  let component: OverviewLayoutComponent
  let fixture: ComponentFixture<OverviewLayoutComponent>
  let excelService: ExcelService

  beforeEach(async(() => {
    const configure = (testBed: TestBed) => {
      testBed.configureTestingModule({
        schemas: [NO_ERRORS_SCHEMA],
        declarations: [OverviewLayoutComponent],
        providers: [
          FormBuilder,
          MdcDialog,
          Overlay,
          ExcelService,
          {
            provide: Store,
            useValue: {
              pipe: jest.fn(),
              dispatch: jest.fn()
            }
          },
          {
            provide: Router,
            useValue: { navigate: jest.fn() }
          }
        ]
      })
    }
    configureTests(configure).then(testBed => {
      fixture = testBed.createComponent(OverviewLayoutComponent)
      component = fixture.componentInstance

      excelService = testBed.get(ExcelService)
      // fixture.detectChanges()
    })
  }))

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
