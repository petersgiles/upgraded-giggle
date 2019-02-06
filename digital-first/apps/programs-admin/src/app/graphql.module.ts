import { NgModule } from '@angular/core'
import {
  HttpClient,
  HttpClientModule,
  HttpErrorResponse
} from '@angular/common/http'
import { ApolloModule, Apollo } from 'apollo-angular'
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { environment } from '../environments/environment'
import { onError } from 'apollo-link-error'

const uri = environment.datasource.dataServiceUrl

@NgModule({
  exports: [HttpClientModule, ApolloModule, HttpLinkModule]
})

// TODO:  remove error link and rewrite error handler to format network error rather than HttpErrorResponse
export class GraphQLModule {
  constructor(apollo: Apollo, private httpClient: HttpClient) {
    const errorLink = onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) => {
          throw graphQLErrors
        })
      }
      if (networkError) {
        throw networkError
      }
    })

    const httpLink = new HttpLink(this.httpClient).create({
      uri: uri
    })

    apollo.create({
      link: errorLink.concat(httpLink),
      cache: new InMemoryCache()
    })
  }
}
