
import 'core-js/es7/reflect'
import 'zone.js/dist/zone'
import 'zone.js/dist/proxy';
import 'zone.js/dist/async-test';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';
import 'jest-zone-patch' 
 
import { async, TestBed, inject} from '@angular/core/testing'
import { ConfigureFn, configureTests } from '../../../../../../libs/df-testing'
import { RecommendedDirectionMapperService } from './recommended-direction-mapper.service'
import { CoreMapperService } from '../../services/mappers/core-mapper.service'
import { RecommendedDirection } from '../../models'
import { Recommendation } from '../../models'
import * as data from '../../../../../../devdata/data'

describe('RecommendedDirectionMapperService', () => {

  let service: RecommendedDirectionMapperService
  let brief: any

  beforeEach(async(() => { 
    const configure = (testBed: TestBed) => {
        testBed.configureTestingModule({
          imports: [],
     providers:
          [ 
            {provide: CoreMapperService,
            useClass: RecommendedDirectionMapperService
            },
           
          ],
        })
      }
       configureTests(configure).then(testBed => {
        service = testBed.get(RecommendedDirectionMapperService)
        brief = data.briefs[0]
      })
  }))

  it('should be created', () => {
    expect(service).toBeTruthy();
  })

  it('should get recommended direction', inject([CoreMapperService],(service: CoreMapperService<RecommendedDirection>) => { 
    let briefId = idFromLookup(brief)
    let recommendationId = idFromLookup(getRecommendation())
    const recommendationDir: RecommendedDirection = service.mapSingle(
        {
          ID: '1',
          Title: 'a direction',
          Recommendation: getRecommendation(),
          Brief: brief
        }
  )

    expect(recommendationDir.id).toBe('1')
    expect(recommendationDir.title).toBe('a direction')
    expect(recommendationDir.recommendation).toBe(recommendationId)
    expect(recommendationDir.brief).toBe(briefId)
  }))
})

function getRecommendation(){
  const recommendation = {
    ID: 1,
    Title: 'Test recommendation',
    Recommendation: 'This is a recomendation',
    Outcome1: 'Agree',
    Outcome2: null,
    Outcome3: null,
    Colour: 'rgb(84, 70, 126)',
    SortOrder: '1',
    Policy: data.policies[0],
    SubPolicy: data.subpolicies[0],
    Brief: data.briefs[0]
  }
  return recommendation
}

function idFromLookup(lookupValue: any) {
    if(lookupValue) {
      return lookupValue['ID'] || lookupValue['Id'] || lookupValue['id']
    }

    return null
  }