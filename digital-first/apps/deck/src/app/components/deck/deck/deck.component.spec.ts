import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { FormBuilder } from '@angular/forms'
import {
  Overlay,
  MdcListModule,
  MdcRippleModule,
  MdcCardModule
} from '@angular-mdc/web'
import { Store } from '@ngrx/store'
import { DfPipesModule, } from '@digital-first/df-pipes';
import { SafeHtmlPipe } from '@df/components/lib/pipes/safe-html.pipe';
import { UserProfileComponent } from '../../../pages/user-profile/user-profile.component';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent
  let fixture: ComponentFixture<UserProfileComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DfPipesModule, MdcListModule, MdcRippleModule, MdcCardModule],
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
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
