import { Injectable, Inject } from '@angular/core'
import { CoreMapperService } from './core-mapper.service'
import { Discussion } from '../../models'
import { AuthorMapperService } from './author-mapper.service'

@Injectable({
  providedIn: 'root'
})
export class DiscussionMapperService extends CoreMapperService<Discussion> {

  constructor(private authorMapperService: AuthorMapperService) {
    super()
    console.log(`authorMapperService =>`, this.authorMapperService)
  }

  public mapSingle(item: any): Discussion {

    console.log(  `mapSingle`, this, item)
    const author = {
      username: null, 
      name: null, 
      email: null, 
      phone: null, 
      color: null

    } //this.authorMapperService.mapSingle(item.Author)

    return {
      id: `${item.ID}`,
      sortOrder: item.SortOrder,
      briefId: `${item.Brief.ID}`,
      channel: null,
      parent: item.Parent,
      text: `${item.Comments}`,
      created: `${item.Created}`,
      author: author
    }
  }
}