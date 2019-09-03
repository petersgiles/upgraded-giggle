
import 'core-js/es7/reflect'
import 'zone.js/dist/zone'
import 'zone.js/dist/proxy';
import 'zone.js/dist/async-test';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';
import 'jest-zone-patch' 
 
import { async, TestBed, inject} from '@angular/core/testing'
import { ConfigureFn, configureTests } from '../../../../../../libs/df-testing'

import { RecommendationMapperService } from './recommendation-mapper.service'
import { CoreMapperService } from '../../services/mappers/core-mapper.service'
import { Recommendation } from '../../models'
import * as data from '../../../../../../devdata/data'
import { Brief, DisplayLookup  } from '../../models'


describe('RecommendationMapperService', () => {

  let service: RecommendationMapperService
  let subPolicy
  let policy
  let brief


  beforeEach(async(() => { 
    const configure = (testBed: TestBed) => {
        testBed.configureTestingModule({
          imports: [],
     providers:
          [ 
            
            RecommendationMapperService,
            {provide: CoreMapperService,
            useClass: RecommendationMapperService
            },
           
          ],
        })
      }
       configureTests(configure).then(testBed => {

        service = testBed.get(RecommendationMapperService)
        subPolicy = idFromLookup(data.subpolicies[0])
        policy = idFromLookup(data.policies[0])
        brief = idFromLookup(data.briefs[0])
      })
  }))

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should create Brief', inject([CoreMapperService],(service: CoreMapperService<Recommendation>) => { //
    const recommendation: Recommendation = service.mapSingle(getRecommendation())

    expect(recommendation.id).toBe(getRecommendation().ID)
    expect(recommendation.title).toBe(getRecommendation().Title)
    expect(recommendation.recommendation).toBe(getRecommendation().Recommendation)
    expect(recommendation.order).toBe(getRecommendation().SortOrder)
    expect(recommendation.outcome1).toBe(getRecommendation().Outcome1)
    expect(recommendation.outcome2).toBe(getRecommendation().Outcome2)
    expect(recommendation.outcome3).toBe(getRecommendation().Outcome3)
    expect(recommendation.colour).toBe(getRecommendation().Colour)
    expect(recommendation.brief).toBe(brief)
    expect(recommendation.policy).toBe(policy)
    expect(recommendation.subPolicy).toBe(subPolicy)
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