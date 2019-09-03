
import 'core-js/es7/reflect'
import 'zone.js/dist/zone'
import 'zone.js/dist/proxy';
import 'zone.js/dist/async-test';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';
import 'jest-zone-patch' 
 
import { async, TestBed, inject} from '@angular/core/testing'
import { Injector} from '@angular/core'
import { ConfigureFn, configureTests } from '../../../../../../libs/df-testing'

import { AttachmentMapperService } from './attachment-mapper.service'
import { CoreMapperService } from '../../services/mappers/core-mapper.service'
import { Attachment } from '../../models'
import * as data from '../../../../../../devdata/data'
import { Brief, DisplayLookup  } from '../../models'


describe('AttachmentMapperService', () => {
  let service: AttachmentMapperService
  let brief: any
  let attachment: Attachment
  let SPAttachment: any

  beforeEach(async(() => { 
    const configure = (testBed: TestBed) => {
        testBed.configureTestingModule({
          imports: [],
     providers:
          [ 
            {provide: CoreMapperService,
            useClass: AttachmentMapperService
            },
           
          ],
        })
      }
       configureTests(configure).then(testBed => {
        service = testBed.get(AttachmentMapperService)
        brief = fromLookup(data.briefs[0])
        attachment = getAttachment()
        attachment.briefId = brief.id
        SPAttachment = getSPAttachment()
      })
  }))

  it('should be created', () => {
    expect(service).toBeTruthy();
  })

  it('should get attachment', inject([CoreMapperService],(service: CoreMapperService<Attachment>) => { //
    const thisAttachment = service.mapSingle(
        {Brief: brief,
        ID: SPAttachment.ID,
        Title: SPAttachment.Title,
        Notes0: SPAttachment.Notes0,
        FileLeafRef: SPAttachment.FileLeafRef,
        SortOrder: SPAttachment.SortOrder}
  )
    expect(thisAttachment.briefId).toBe(6)
    expect(thisAttachment.id).toBe(1)
    expect(thisAttachment.title).toBe('title')
    expect(thisAttachment.fileLeafRef).toBe('LOCALDEV-DAVE-636904932061394635.docx')
    expect(thisAttachment.notes).toBe('test')
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

function getAttachment(){
  const attachment = {
    id: '1',
    fileLeafRef: 'LOCALDEV-DAVE-636904932061394635.docx',
    notes: 'test',
    title: 'title',
    briefId: '',
    order: '1'
  }
  return attachment
}

function getSPAttachment(){
  const attachment = {
    ID: 1,
    Notes0: 'test',
    Title: 'title',
    SortOrder: 1,
    FileLeafRef: 'LOCALDEV-DAVE-636904932061394635.docx'
  }
  return attachment
}


