import { NgModule } from '@angular/core'
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular'
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import { ApolloLink, split } from 'apollo-link'
import { getMainDefinition } from 'apollo-utilities/src'
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http'
import { Definition } from '@angular/compiler-cli'

export function createApollo(httpLink: HttpLink) {
  const cache = new InMemoryCache() // shared cache

  const defaultOptions = {
    watchQuery: {
      errorPolicy: 'ignore'
    },
    query: {
      errorPolicy: 'all'
    }
  }

  // N.B. endpoint is configured to only allow queries via 'GET' and mutations via 'POST'
  const httpQueryLink = httpLink.create({
    uri: environment.datasource.dataServiceUrl,
    method: 'POST',
    headers: new HttpHeaders({
      ProgramsApiKey: environment.apiKey
    })
  })

  const httpMutationLink = httpLink.create({
    uri: environment.datasource.dataServiceUrl,
    method: 'POST',
    headers: new HttpHeaders({
      ProgramsApiKey: environment.apiKey
    })
  })

  const remoteLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query)
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'mutation'
      )
    },
    httpMutationLink,
    httpQueryLink
  )

  return {
    cache: cache,
    link: ApolloLink.from([remoteLink]), // local should come first
    defaultOptions
  }
}

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink]
    }
  ]
})
export class GraphQLModule {}
