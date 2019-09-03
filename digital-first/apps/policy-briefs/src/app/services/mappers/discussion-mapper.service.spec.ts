
import 'core-js/es7/reflect'
import 'zone.js/dist/zone'
import 'zone.js/dist/proxy';
import 'zone.js/dist/async-test';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';
import 'jest-zone-patch' 
 
import { async, TestBed, inject} from '@angular/core/testing'
import { ConfigureFn, configureTests } from '../../../../../../libs/df-testing'
import { DiscussionMapperService } from './discussion-mapper.service'
import { CoreMapperService } from '../../services/mappers/core-mapper.service'
import { Discussion } from '../../models'

import * as data from '../../../../../../devdata/data'

describe('  DiscussionMapperService', () => {
  let service:   DiscussionMapperService
 
  beforeEach(async(() => { 
    const configure = (testBed: TestBed) => {
        testBed.configureTestingModule({
          imports: [],
     providers:
          [ 
            {provide: CoreMapperService,
            useClass:   DiscussionMapperService
            },
           
          ],
        })
      }
       configureTests(configure).then(testBed => {
        service = testBed.get(  DiscussionMapperService)
        
      })
  }))

  it('should be created', () => {
    expect(service).toBeTruthy();
  })

  it('should get main comment', inject([CoreMapperService],(service: CoreMapperService<Discussion>) => { //
    const discussion: Discussion = service.mapSingle(
        {
          Author: 
            {
              Title: getSPAuthor().Title,
              Email: getSPAuthor().Email,
              Phone: getSPAuthor().Phone
            },
          ID: getSPMainComment().ID,
          Comments: getSPMainComment().Comments,
          SortOrder: getSPMainComment().SortOrder,
          Brief: getSPMainComment().Brief,
          Channel: getSPMainComment().Channel,
          Created: getSPMainComment().Created
        }
  )
    expect( discussion.author.color).toBe('rgb(84, 70, 126)')
    expect( discussion.author.name).toBe('Kim')
    expect( discussion.author.username).toBe('Kim')
    expect( discussion.author.email).toBe('person@address.com')
    expect( discussion.author.phone).toBe('02 34552664')
    expect( discussion.id).toBe('1')
    expect( discussion.briefId).toBe('6')
    expect( discussion.channel).toBe('Agency')
   
  }))

  it('should get second comment', inject([CoreMapperService],(service: CoreMapperService<Discussion>) => { //
    const discussion: Discussion = service.mapSingle(
        {
          Author:
            {
              Title: getSPSecondAuthor().Title,
              Email: getSPSecondAuthor().Email,
              Phone: getSPSecondAuthor().Phone
            },
          ID: getSPSecondComment().ID,
          Comments: getSPSecondComment().Comments,
          SortOrder: getSPSecondComment().SortOrder,
          Brief: getSPSecondComment().Brief,
          Parent: getSPSecondComment().Parent,
          Channel: getSPSecondComment().Channel,
          Created: getSPSecondComment().Created
        }
  )
  expect( discussion.author.color).toBe('rgb(84, 70, 126)')
  expect( discussion.author.name).toBe('Pete')
  expect( discussion.author.username).toBe('Pete')
  expect( discussion.author.email).toBe('pete@address.com')
  expect( discussion.author.phone).toBe('0401224213')
  expect( discussion.id).toBe('2')
  expect( discussion.briefId).toBe('6')
  expect( discussion.channel).toBe('Agency')
  expect( discussion.parent).toBe(`$getSPMainComment().Parent.ID`)
  }))
})

function getSPAuthor(){
  const author = {
    Title: 'Kim',
    Email: 'person@address.com',
    Phone: '02 34552664'
  }
  return author
}

function getSPSecondAuthor(){
  const author = {
    Title: 'Pete',
    Email: 'pete@address.com',
    Phone: '0401224213'
  }
  return author
}

function getSPMainComment(){
  const comment = {
      ID: 1,
      Title: 'Test Title',
      Comments: 'Main comment',
      Parent: null,
      Channel: 'Agency',
      Created: '2019-03-13T13:00:00.000Z',
      SortOrder: 1,
      Brief: data.briefs[0]
  }
  return comment
}

function getSPSecondComment(){
  const comment = {
      ID: 2,
      Title: 'Test Title Comment',
      Comments: 'Main comment Comment',
      Parent: `$getSPMainComment().Parent.ID`,
      Channel: 'Agency',
      Created: '2019-03-13T13:00:00.000Z',
      SortOrder: 1,
      Brief: data.briefs[0]
  }
  return comment
}