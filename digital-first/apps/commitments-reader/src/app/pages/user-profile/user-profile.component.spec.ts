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
import { UserProfileComponent } from './user-profile.component'
import { SafeHtmlPipe } from '../../../../../../libs/df-pipes/src/lib/safe-html.pipe'
import { DfPipesModule } from '../../../../../../libs/df-pipes/src/lib/df-pipes.module'
import { Store} from '@ngrx/store'
import { MockStore } from '@ngrx/store/testing'

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let mockStore: MockStore<any>
 
  beforeEach(async(() => {
    const configure: ConfigureFn = testBed => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [DfPipesModule],
      declarations: [UserProfileComponent],
      providers:
      [SafeHtmlPipe, 
        {provide: Store,
          useValue: {
            pipe: jest.fn()
          }}]
    })
   }
   configureTests(configure).then(testBed => {
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance
    mockStore = TestBed.get(Store)
    fixture.detectChanges()
  })
  
  }))

  it('should create', () => {
    expect(component).toBeTruthy();
  })

 })