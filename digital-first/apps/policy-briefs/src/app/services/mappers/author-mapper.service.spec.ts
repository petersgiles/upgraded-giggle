
import 'core-js/es7/reflect'
import 'zone.js/dist/zone'
import 'zone.js/dist/proxy';
import 'zone.js/dist/async-test';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';
import 'jest-zone-patch' 
 
import { async, TestBed, inject} from '@angular/core/testing'
import { ConfigureFn, configureTests } from '../../../../../../libs/df-testing'
import { Author } from '../../models'
import { AuthorMapperService } from './author-mapper.service';
import { CoreMapperService } from '../../services/mappers/core-mapper.service'



describe('AuthorMapperService', () => {

  let service: AuthorMapperService
  let SPAuthor: any

  beforeEach(async(() => { 
    const configure: ConfigureFn = testBed => {
        TestBed.configureTestingModule({
          imports: [],
     providers:
          [ 
            {provide: CoreMapperService,
            useClass: AuthorMapperService
            },
           
          ],
        })
      }
       configureTests(configure).then(testBed => {
        service = TestBed.get(AuthorMapperService)
        SPAuthor = getSPAuthor()
      })
  }))

  it('should be created', () => {
    expect(service).toBeTruthy();
  })

  it('should get author', inject([CoreMapperService],(service: CoreMapperService<Author>) => { //
    const author = service.mapSingle(
        {
          Title: SPAuthor.Title,
          Email: SPAuthor.Email,
          Phone: SPAuthor.Phone
        }
  )
    expect(author.username).toBe(SPAuthor.Title)
    expect(author.name).toBe(SPAuthor.Title)
    expect(author.email).toBe(SPAuthor.Email)
    expect(author.phone).toBe(SPAuthor.Phone)
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



