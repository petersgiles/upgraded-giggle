import { Injectable } from '@angular/core'
import { CoreMapperService } from './core-mapper.service'
import { Discussion } from '../../models'
import { AuthorMapperService } from './author-mapper.service';

@Injectable({
  providedIn: 'root'
})
export class DiscussionMapperService extends CoreMapperService<Discussion> {
  constructor(private authorMapperService: AuthorMapperService) {
    super()
  }

  public mapSingle(item: any): Discussion {
    return {
      id: `${item.ID}`,
      sortOrder: item.SortOrder,
      briefId: `${item.Brief.ID}`,
      channel: null,
      parent: item.Parent,
      text: `${item.Comments}`,
      created: `${item.Created}`,
      // author: {} this.authorMapperService.mapSingle(item.Author)
    }
  }
}
