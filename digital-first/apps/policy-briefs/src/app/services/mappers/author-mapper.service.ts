import { Injectable } from '@angular/core';
import { CoreMapperService } from './core-mapper.service';
import { Author } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class AuthorMapperService extends CoreMapperService<Author> {
  constructor() {
    super()
  }

  public mapSingle(item: any): Author {

    let author = {
      username: 'Anonymous',
      name: 'Anonymous',
      email: '',
      phone: '',
      color: 'rgb(84, 70, 126)'
    }

    if(item){
      author = {
        username: item.Title,
        name: item.Title,
        email: item.Email,
        phone: item.Phone,
        color: 'rgb(84, 70, 126)'
      }
    }

    return author
  }
}
