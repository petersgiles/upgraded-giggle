import {NgModule} from '@angular/core'
import {HttpClient, HttpClientModule} from '@angular/common/http'
import {ApolloModule, Apollo} from 'apollo-angular'
import {HttpLinkModule, HttpLink} from 'apollo-angular-link-http'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {environment} from '../environments/environment'
const uri = environment.datasource.dataServiceUrl

@NgModule({
  exports: [HttpClientModule, ApolloModule, HttpLinkModule]
})

export class GraphQLModule {
  constructor(apollo: Apollo, private httpClient: HttpClient) {

    const httpLink = new HttpLink(this.httpClient).create({
      uri: uri
    })

    apollo.create({
      link: httpLink,
      cache: new InMemoryCache()
    })
  }
}
