import 'core-js/es7/reflect'
import 'zone.js/dist/zone'
import 'zone.js/dist/proxy'
import 'zone.js/dist/async-test'
import 'zone.js/dist/proxy.js'
import 'zone.js/dist/sync-test'
import 'jest-zone-patch'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { UserProfileComponent } from './user-profile.component'
import { FormBuilder } from '@angular/forms'
import { Overlay } from '@angular-mdc/web'
import { Store, select } from '@ngrx/store'
import { DfPipesModule } from 'libs/df-pipes/src/lib/df-pipes.module';
import { SafeHtmlPipe } from 'libs/df-pipes/src/lib/safe-html.pipe';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent
  let fixture: ComponentFixture<UserProfileComponent>

  beforeEach(async(() => {
    const configure = (testBed: TestBed) => {
      testBed.configureTestingModule({
        schemas: [NO_ERRORS_SCHEMA],
        imports: [DfPipesModule],
        declarations: [UserProfileComponent],
        providers: [
          SafeHtmlPipe,
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
    fixture = TestBed.createComponent(UserProfileComponent)
    component = fixture.componentInstance
  }))

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
