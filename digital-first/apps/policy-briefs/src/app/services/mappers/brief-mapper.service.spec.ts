 
 
import { async, TestBed, inject} from '@angular/core/testing'
import { Injector} from '@angular/core'
import { ConfigureFn, configureTests } from '../../../../../../libs/df-testing'

import { BriefMapperService } from './brief-mapper.service'
import { CoreMapperService } from '../../services/mappers/core-mapper.service'

import * as data from '../../../../../../devdata/data'
import { briefdivisions } from '../../../../../../devdata/data'
import { Brief, DisplayLookup  } from '../../models'


describe('BriefMapperService', () => {

  let briefMapperService: BriefMapperService
  let subPolicy
  let policy
  let briefStatus
  let briefDivision
  let editor
  let result


  beforeEach(async(() => { 
    const configure = (testBed: TestBed) => {
        testBed.configureTestingModule({
          imports: [],
     providers:
          [ 
            
            BriefMapperService,
            {provide: CoreMapperService,
            useClass: BriefMapperService
            },
           
          ],
        })
      }
       configureTests(configure).then(testBed => {

        briefMapperService = testBed.get(BriefMapperService)
        subPolicy = fromLookup(data.subpolicies[0])
        policy = fromLookup(data.policies[0])
        briefDivision = fromLookup(data.dlms[0])
        briefStatus = fromLookup(data.briefstatuses[0])
        editor = {id: '1', title: 'Kim'}
        result = data.briefs[0]
      })
  }))

  it('should be created', () => {
    expect(briefMapperService).toBeTruthy()
  })

  it('should create Brief', inject([CoreMapperService],(service: CoreMapperService<Brief>) => { //
    const brief = service.mapSingle(
    {...result,
    Editor: editor,
    SubPolicy: subPolicy,
    Policy: policy,
    BriefStatus: briefStatus,
    BriefDivision: briefDivision,
  })
    expect(brief.briefDivision.title).toBe('In Draft')
    expect(brief.dLM).toBe('For Official Use Only')
    expect(brief.editor.title).toBe('Kim')
    expect(brief.fileLeafRef).toBe('LOCALDEV-DAVE-636904932061394635.docx')
    expect(brief.policy.title).toBe('Sample Policy Two')
    expect(brief.securityClassification).toBe('UNCLASSIFIED')
    expect(brief.subPolicy.title).toBe('SubPolicy Two')
    expect(brief.title).toBe('The Determinism Of Free-Floating Disposition')
  }))
})

function fromLookup(lookupValue: any): DisplayLookup {

  if(!lookupValue){
    return {
      id: null,
      title: null
    }
  }

  const id = lookupValue['ID'] || lookupValue['Id'] || lookupValue['id']
  const title = lookupValue['Title'] || lookupValue['title']
  return {
    id: id,
    title: title
  }
}
