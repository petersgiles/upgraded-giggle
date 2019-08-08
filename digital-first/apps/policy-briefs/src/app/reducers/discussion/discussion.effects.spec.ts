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
import { Store } from '@ngrx/store'
import { provideMockStore, MockStore } from '@ngrx/store/testing'
import {
  concatMap,
  map,
  catchError,
  switchMap,
  tap,
  withLatestFrom
} from 'rxjs/operators'
import { of, Observable } from 'rxjs'
import { provideMockActions } from '@ngrx/effects/testing'
import { cold, hot } from 'jasmine-marbles'

import { DiscussionEffects } from './discussion.effects'

import {
  DiscussionActionTypes,
  DiscussionActions,
  GetDiscussion,
  LoadDiscussions,
  GetDiscussionFailure,
  AddComment,
  RemoveComment
} from './discussion.actions'
//import { idFromLookup, fromUser } from '@df/sharepoint'
import { pickColor } from '../../utils/colour'
import { DiscussionDataService } from './discussion-data.service'
import { DiscussionDataLocalService } from '../../reducers/discussion/local/discussion-data.service'
import { comments } from '../../../devdata/data'
import { DiscussionType } from '../../models'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { HttpClient } from '@angular/common/http'
import { BriefMapperService } from '../../services/mappers/brief-mapper.service'
import { CoreMapperService } from '../../services/mappers/core-mapper.service'

describe('DiscussionEffects', () => {
  debugger
    let mockStore: MockStore<any>
    let actions$: Observable<any>
    let discussionEffects: DiscussionEffects
    let service: DiscussionDataLocalService

  /*   const mapComment = (item): any => {
      const brief = idFromLookup(item.Brief)
      const parent = idFromLookup(item.Parent)
      const user = fromUser(item.Author)
      const author = {
        ...user,
        color: pickColor(user.email)
      }
    
      return {
        id: item.ID,
        title: item.Title,
        created: item.Created,
        text: item.Comments,
        brief: brief,
        parent: parent,
        author: author
      }
    }
    
    const mapComments = (items): any[] => (items || []).map(mapComment)
 */
    const initialState =   {
     discussion: {activeChannel: 'Agency', channels: ['Agency']}
    } 

    beforeEach(async(() => { 
      const configure: ConfigureFn = testBed => {
          TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
       providers:
            [ 
              HttpClient,
              DiscussionEffects,
              BriefMapperService,
              HttpClient,
              {provide: CoreMapperService,
              useClass: BriefMapperService
              },
              {provide: DiscussionDataService,
              useClass: DiscussionDataLocalService
            },
            { provide: Store,
              useValue: {
                pipe: jest.fn()
              }
             },
                DiscussionEffects,
                provideMockActions(() => actions$),
                provideMockStore({ initialState}),
            ],
          })
        }
         configureTests(configure).then(testBed => {
          mockStore = TestBed.get(Store)
          let state = {...initialState, activeBriefId: '2'}
          mockStore.setState(state)
          discussionEffects = TestBed.get(DiscussionEffects)
          service = TestBed.get(DiscussionDataLocalService)
        })
    }))
  
    function getRealDiscussions(id){
      return service.getDiscussions({ id: id, channel: DiscussionType.Agency })
    }
    

  it('should be created', () => {
    expect(discussionEffects).toBeTruthy()
  })

  it('should Load Discussions/Comments', inject([DiscussionDataService], (service:DiscussionDataService)  => {
    let discussions
    getRealDiscussions(10).pipe(map(discussions => {
        discussions = discussions.data
    }))
    const action = new GetDiscussion({activeBriefId: '10',  channel: DiscussionType.Agency})
    actions$ = hot('-a', { a: action} )
    const response = cold('-a|', { a: {data: discussions, loading: false} });
    const expected = cold('--b', {b: new LoadDiscussions({data: discussions,loading: false})})
    service.getDiscussions = jest.fn(() => response)

    expect(discussionEffects.loadDiscussions$).toBeObservable(expected)
  }))

  it('should Load Discussions/Comments', inject([DiscussionDataService], (service:DiscussionDataService)  => {
    let discussions
    getRealDiscussions(10).pipe(map(discussions => {
        discussions = discussions.data
    }))
    const action = new AddComment({activeBriefId: '10',  channel: DiscussionType.Agency})
    actions$ = hot('-a', { a: action} )
    const response = cold('-a|', { a: {data: discussions, loading: false} });
    const expected = cold('--b', {b: new GetDiscussion({activeBriefId: '10',  channel: DiscussionType.Agency})})
    service.getDiscussions = jest.fn(() => response)

    expect(discussionEffects.loadDiscussions$).toBeObservable(expected)
  }))


})


function  addComment(comment: {
  text: string
  brief: string
  parent: string
}): Observable<any> {
  return this.sharepoint
    .storeItem({
      listName: 'Comment',
      data: {
        Comments: comment.text,
        Brief: comment.brief,
        Parent: comment.parent
      }
    })
    .pipe(concatMap(_ => of({ brief: comment.brief })))
}

function removeComment(comment: { id: string; brief: string }): Observable<any> {
  return this.sharepoint
    .removeItem({
      listName: 'Comment',
      id: comment.id
    })
    .pipe(concatMap(_ => of({ brief: comment.brief })))
}

