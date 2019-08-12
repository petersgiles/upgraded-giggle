import { Injectable, Inject } from '@angular/core'
import { CoreMapperService } from './core-mapper.service'
import { Discussion } from '../../models'
import { AuthorMapperService } from './author-mapper.service'

@Injectable({
  providedIn: 'root'
})
export class DiscussionMapperService extends CoreMapperService<Discussion> {

  constructor() {
    super()
  }

  public mapSingle(item: any): Discussion {

    const authorMapperService = new AuthorMapperService()
    const author = authorMapperService.mapSingle(item.Author) || {
      username: null, 
      name: null, 
      email: null, 
      phone: null, 
      color: null
    } 

    return {
      id: `${item.ID}`,
      sortOrder: item.SortOrder,
      briefId: `${item.Brief.ID || item.Brief.Id}`,
      channel: item.Channel,
      parent: item.Parent,
      text: `${item.Comments}`,
      created: `${item.Created}`,
      author: author
    }
  }
}