import 'core-js/es7/reflect'
import 'zone.js/dist/zone'
import 'zone.js/dist/proxy';
import 'zone.js/dist/async-test';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';
import 'jest-zone-patch' 
 
import { async, TestBed, inject} from '@angular/core/testing'
import { ConfigureFn, configureTests } from '../../../../../../libs/df-testing'
import { Author } from '../../models'
import { BriefNavigationMapperService } from './brief-navigation-mapper.service';
import { CoreMapperService } from '../../services/mappers/core-mapper.service'
import { NavigationNode } from '../../models'


describe(' BriefNavigationMapperService', () => {
  let service:  BriefNavigationMapperService
  let navigation: any

  beforeEach(async(() => { 
    const configure = (testBed: TestBed) => {
        testBed.configureTestingModule({
          imports: [],
     providers:
          [ 
            {provide: CoreMapperService,
            useClass:  BriefNavigationMapperService
            },
           
          ],
        })
      }
       configureTests(configure).then(testBed => {
        service = testBed.get( BriefNavigationMapperService)
        navigation = getNav()
      })
  }))

  it('should be created', () => {
    expect(service).toBeTruthy();
  })

  it('should get navigation', inject([CoreMapperService],(service: CoreMapperService<NavigationNode>) => { //
    const nav: NavigationNode = service.mapSingle(
        {
          ID: navigation.ID,
          Policy: navigation.Policy,
          SubPolicy: navigation.SubPolicy
        }
  )
    expect(nav.active).toBeFalsy()
    expect(nav.briefId).toBe(1)
    expect(nav.id).toBe('1-1-1')
    expect(nav.parent).toBe('1-1')
    expect(nav.policy).toBe(1)
    expect(nav.subpolicy).toBe(1)
  }))
})

function getNav(){
  const nav = {
    ID: 1,
    Policy:  {Id: 1, Title: 'Sample Policy'},
    SubPolicy: {Id: 1, Title: 'SubPolicy One'}
  }
  return nav
}