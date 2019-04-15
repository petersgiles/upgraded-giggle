import { NgModule } from '@angular/core'
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { ApolloModule, Apollo } from 'apollo-angular'
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { environment } from '../environments/environment'

@NgModule({
  exports: [HttpClientModule, ApolloModule, HttpLinkModule]
})
export class GraphQLModule {
  constructor(apollo: Apollo, private httpClient: HttpClient) {
    Object.keys(environment.datasources)
      .filter(key => environment.datasources[key].type === 'apollo')
      .forEach(key => {
        const options = {
          link: new HttpLink(this.httpClient).create({
            uri: environment.datasources[key].dataServiceUrl
          }),
          resolvers: {
            Mutation: {
              expandNavNode(input: string) {
                return {
                  code: '200',
                  success: true,
                  message: 'Hi'
                }
              }
            },
            NavigatorTreeNode: {
              active() {
                return true
              },
              expanded() {
                return false
              }
          }},
          cache: new InMemoryCache()
        }

        apollo.create(options, key)

      })
  }
}
