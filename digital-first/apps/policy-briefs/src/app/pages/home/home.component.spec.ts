 

import { ConfigureFn, configureTests } from '../../../../../../libs/df-testing'

import { NO_ERRORS_SCHEMA } from '@angular/core'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { HomeComponent } from './home.component'
import { selectAppBackgroundColour, Config } from '../../../../../../libs/df-app-core/src'
import { Store, select} from '@ngrx/store'
import { provideMockStore, MockStore } from '@ngrx/store/testing'
import { provideMockActions } from '@ngrx/effects/testing'
import { Observable } from 'rxjs'

describe('HomeComponent', () => {

  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockStore: MockStore<any>
  let actions$: Observable<any>
  let config: Config
  let background$: Observable<string>
 
  const initialState = {
    config
  }

  beforeEach(async(() => {
    const configure = (testBed: TestBed) => {
    testBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [HomeComponent],
      providers:
      [{ provide: Store,
        useValue: {
          pipe: jest.fn()
        }
       },
        provideMockActions(() => actions$),
        provideMockStore({ initialState})
        ]
    })
   }
   configureTests(configure).then(testBed => {
    fixture = testBed.createComponent(HomeComponent);
    component = fixture.componentInstance
    mockStore = testBed.get(Store)
    initialState.config = getConfig()
    mockStore.overrideSelector(selectAppBackgroundColour, initialState.config.header.backgroundColour) 

    fixture.detectChanges()
  })
  
  }))

  it('should create', () => {
    expect(component).toBeTruthy();
  })

  it('should return the background colour', () => {
    mockStore
    .select(selectAppBackgroundColour)
    .subscribe(colour => {
      expect(colour).toBe('#455a64')
  })
  })

  it('observable should return colour', () => {
    background$ = mockStore.pipe(
      select(selectAppBackgroundColour))
      background$.subscribe(colour => {
        expect(colour).toBe('#455a64')
        }
      )
   })

 })

 function getConfig(){
  const defaults: Config = {
    webId: null,
    siteId: null,
    header: {
      title: 'Unconfigured Application',
      backgroundColour: '#455a64',
      classification: 'UNCLASSIFIED',
      logo: {
        image: 'assets/crest.png',
        url: '/'
      },
      apps: []
    }
  }
  return defaults
}