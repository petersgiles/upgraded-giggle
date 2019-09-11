import { configureTests } from '../../../../../../libs/df-testing'

import { NO_ERRORS_SCHEMA } from '@angular/core'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { HomeComponent } from './home.component'
import { FormBuilder } from '@angular/forms'
import { Overlay } from '@angular-mdc/web'
import { Store } from '@ngrx/store'

describe('HomeComponent', () => {
  let component: HomeComponent
  let fixture: ComponentFixture<HomeComponent>

  beforeEach(async(() => {
    const configure = (testBed: TestBed) => {
      testBed.configureTestingModule({
        schemas: [NO_ERRORS_SCHEMA],
        declarations: [HomeComponent],
        providers: [
          FormBuilder,
          Overlay,
          {
            provide: Store,
            useValue: {
              pipe: jest.fn(),
              dispatch: jest.fn()
            }
          }
        ]
      })
    }
    configureTests(configure).then(testBed => {
      fixture = testBed.createComponent(HomeComponent)
      component = fixture.componentInstance
      // fixture.detectChanges()
    })
  }))

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
