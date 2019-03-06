import { NgModule } from '@angular/core'
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { ApolloModule, Apollo } from 'apollo-angular'
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { environment } from '../environments/environment'
import { onError } from 'apollo-link-error'
import { ApolloLink } from 'apollo-link'
import DebounceLink from 'apollo-link-debounce'
import { trimWhiteSpaceAndReplaceEmptyStringsWithNull } from './core/graphqlhelper'
import { getOperationDefinition } from 'apollo-utilities'

const uri = environment.datasource.dataServiceUrl

@NgModule({
  exports: [HttpClientModule, ApolloModule, HttpLinkModule]
})


export class GraphQLModule {
  private DEFAULT_DEBOUNCE_TIMEOUT: 400 // NB.  default debounce doesn't seem to be observed. need to set explicitly in request
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
      link: ApolloLink.from([
        trimWhitespaceOrNullLink,
        errorLink,
        new DebounceLink(this.DEFAULT_DEBOUNCE_TIMEOUT),
        httpLink
      ]),
      cache: new InMemoryCache()
    })
  }
}

// an apollo link that will trim any white spaces from mutation variables and
// if an empty string is encountered replace with a null as the PM&C graphql
// endpoint validators consider empty string as invalid
const trimWhitespaceOrNullLink = new ApolloLink((operation, forward) => {
  const operationDefinition = getOperationDefinition(operation.query)

  if (
    operationDefinition.kind === 'OperationDefinition' &&
    operationDefinition.operation === 'mutation'
  ) {
    operation.variables = trimWhiteSpaceAndReplaceEmptyStringsWithNull(
      operation.variables
    )
  }

  return forward(operation).map(data => data)
})
