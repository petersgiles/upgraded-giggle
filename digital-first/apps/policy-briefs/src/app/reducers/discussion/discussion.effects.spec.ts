 
 
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
import { comments } from '../../../../../../devdata/comments'
import { DiscussionType, Discussion } from '../../models'
import { HttpClientTestingModule} from '@angular/common/http/testing'
import { HttpClient } from '@angular/common/http'
import { BriefMapperService } from '../../services/mappers/brief-mapper.service'
import { CoreMapperService } from '../../services/mappers/core-mapper.service'

describe('DiscussionEffects', () => {
    let mockStore: MockStore<any>
    let actions$: Observable<any>
    let discussionEffects: DiscussionEffects
    let service: DiscussionDataLocalService


    const initialState =   {
     discussion: {activeChannel: 'Agency', channels: ['Agency']}
    } 

    beforeEach(async(() => { 
      const configure = (testBed: TestBed) => {
          testBed.configureTestingModule({
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
          mockStore = testBed.get(Store)
          let state = {...initialState, activeBriefId: '2'}
          mockStore.setState(state)
          discussionEffects = testBed.get(DiscussionEffects)
          service = testBed.get(DiscussionDataLocalService)
        })
    }))
  
    function getRealDiscussions(id){
      let discussions
       service.getDiscussions({ id: id, channel: DiscussionType.Agency }).subscribe(items => {
          discussions = items
       })
      return discussions
    }
    

  it('should be created', () => {
    expect(discussionEffects).toBeTruthy()
  })

  it('should Load Discussions/Comments', inject([DiscussionDataService], (service:DiscussionDataService)  => {
    let discussions = getRealDiscussions(10)

    const action = new GetDiscussion({activeBriefId: '10',  channel: DiscussionType.Agency})
    actions$ = hot('-a', { a: action} )
    const response = cold('-a|', { a: {data: discussions, loading: false} });
    const expected = cold('--b', {b: new LoadDiscussions({data: discussions,loading: false})})
    service.getDiscussions = jest.fn(() => response)

    expect(discussionEffects.loadDiscussions$).toBeObservable(expected)
  }))

  it('should add comment', inject([DiscussionDataService], (service:DiscussionDataService)  => {
    let discussions = getRealDiscussions(10).data

    const action = new AddComment({brief: '10', text: 'test',  channel: DiscussionType.Agency, parent: null})
    actions$ = hot('-a', { a: action} )
    const response = cold('-a|', { a: {data: discussions, loading: false} });
    const expected = cold('-b', {b: new GetDiscussion({activeBriefId: '10'})})
    service.getDiscussions = jest.fn(() => response)

    expect(discussionEffects.addComment$).toBeObservable(expected)
  }))

  it('should remove comment', inject([DiscussionDataService], (service:DiscussionDataService)  => {
    let newComments: Discussion[] = []
    let comments = service.removeComment({id: '19', brief: '10'})
    comments.subscribe((comment: Discussion) =>{
     newComments.push(comment)
    })
    const action = new RemoveComment({id: '19', brief: '10'})
    actions$ = hot('-a', { a: action} )
    const response = cold('-a|', { a: {data: newComments, loading: false} });
    const expected = cold('-b', {b: new GetDiscussion({activeBriefId: '10'})})
    service.getDiscussions = jest.fn(() => response)

    expect(discussionEffects.removeComment$).toBeObservable(expected)
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

