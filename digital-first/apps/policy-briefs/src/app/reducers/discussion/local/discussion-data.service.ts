import { Injectable } from '@angular/core'
import { Observable, of, BehaviorSubject, Subject, Subscription } from 'rxjs'
import { map } from 'rxjs/operators'
import { DiscussionDataService } from '../discussion-data.service'
import { comments } from '../../../../../../../devdata/data'
import { DiscussionMapperService } from '../../../services/mappers/discussion-mapper.service';
import { DiscussionType } from '../../../models';
import { max } from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DiscussionDataLocalService implements DiscussionDataService {
  fakeDiscussionBackend: Subject<any[]> = new Subject()
  fakeDiscussionBackendSubscription$: Subscription
  discussionItems: BehaviorSubject<any> = new BehaviorSubject(null)
  discussions: any[]
  addDiscussion(item: any): Observable<any> {
    const foundComment = comments.find(comment => comment.Brief.Id === item.brief)

    let maxIndex = -1, maxId
    comments.map(function(comment, i){  
      if(comment.Brief.Id === item.brief){
        if(maxIndex === -1){
            maxIndex = i;
            maxId = comment.Id
      } else {
              if (comment.Id > maxId){
                  maxId = comment.Id
                  maxIndex = i; 
              }
      }
    }
    })

   if(maxIndex >= 0){
      let index = comments.indexOf(foundComment)
      let comment = comments[index]
      comment.Comments = item.text
      comment.Id = maxId + 1
      comments.push(comment)
      this.fakeDiscussionBackend.next(comments)
    }
    
    return of({ briefId: item.brief, loading: false })
  }
  updateDiscussion(item: any): Observable<any> {
    throw new Error('Method not implemented.')
  }
  removeDiscussion(item: any): Observable<any> {
    const foundComment = comments.find(comment => comment.Brief.Id === item.brief && comment.Id === item.id)
    let newComments: any[] = []
    comments.forEach(comment => {
      if(comment.Brief.Id != item.brief && comment.Id != item.id){
        newComments.push(comment)
      }
    })
    this.fakeDiscussionBackend.next(newComments)
    return of({ briefId: item.brief, loading: false })
  }

  public getDiscussions(item: {
    id: string,
    channel: DiscussionType
  }): Observable<{
    data: any
    loading: boolean
  }> {

   
   const discussions = this.getDiscussions_(item.channel, item.id)
    //const discussions = comments.filter(p => {
    //  return p.Channel === item.channel && `${p.Brief.Id}` === `${item.id}`
   // })

    return of({
      data: this.discussionMapperService.mapMany(discussions),
      loading: false
    })
  }

  private getDiscussions_(channel, id): any[]{

    this.discussions = []
    this.discussionItems.subscribe(res => {
      res.data.forEach(comment => {
        if(comment.Channel === channel  && `${comment.Brief.Id}` === `${id}`){
          this.discussions.push(comment)
        }
      })
    })
    return this.discussions
  }

  constructor(private discussionMapperService: DiscussionMapperService) {
    this.fakeDiscussionBackendSubscription$ = this.fakeDiscussionBackend.subscribe(next =>
      this.discussionItems.next({
        data: next,
        loading: false
      })
    )

    this.fakeDiscussionBackend.next(comments)
  }
}
