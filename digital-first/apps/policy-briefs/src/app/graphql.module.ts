import { NgModule } from '@angular/core'
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { ApolloModule, Apollo } from 'apollo-angular'
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { environment } from '../environments/environment'
import { BrowserModule } from '@angular/platform-browser'
import gql from 'graphql-tag'
import { GetPackNavigationDocument } from './generated/graphql';

@NgModule({
  imports: [BrowserModule, HttpClientModule, ApolloModule, HttpLinkModule],
  exports: [HttpClientModule, ApolloModule, HttpLinkModule]
})
export class GraphQLModule {
  constructor(apollo: Apollo, private httpClient: HttpClient) {
    const memoryCache = new InMemoryCache()

    const GET_ACTIVE_NAVIGATOR_TREE_NODE = gql`
      query GetActiveNavigatorTreeNode {
        activeNavigatorTreeNode @client
      }
    `

    Object.keys(environment.datasources)
      .filter(key => environment.datasources[key].type === 'apollo')
      .forEach(key => {
        const options = {
          cache: memoryCache,
          link: new HttpLink(this.httpClient).create({
            uri: environment.datasources[key].dataServiceUrl
          }),
          defaults: {},
          resolvers: {
            Mutation: {
              toggleExpandPackNavigationNode: (
                _root,
                variables,
                { cache }
              ) => {
                const query = GetPackNavigationDocument

                const nodes = cache.readQuery({ query })

                const node  = nodes.navigatorTree.find(p => p.id === variables.input.id)
                node.isExpanded = !node.isExpanded

                const data = {...nodes}

                data.navigatorTree.filter(p => p.id !== node.id)
                data.navigatorTree.push(node)

                // tslint:disable-next-line: no-console
                console.log(
                  `🐷 toggleExpandPackNavigationNode`,
                  data
                )

                memoryCache.writeData({
                  data: {
                    navigatorTree: [],
                    activeNavigatorTreeNode: null
                  }
                })
                return true
              },
              activatePackNavigationNode: (
                _,
                { input },
                { cache, getCacheKey }
              ) => {
                const id = getCacheKey({
                  __typename: 'NavigatorTreeNode',
                  id: input.id
                })
                // tslint:disable-next-line: no-console
                console.log(`🐷 activatePackNavigationNode`, input)

                // you can also do cache.writeData({ data, id }) here if you prefer
                cache.writeData({ data: { activeNavigatorTreeNode: id } })
                return true
              }
            },
            NavigatorTreeNode: {
              isActive: ({ id }, _, { cache }) => {
                const activeNodeId = cache.readQuery({
                  query: GET_ACTIVE_NAVIGATOR_TREE_NODE
                })
                // tslint:disable-next-line: no-console
                console.log(`🐯`, id, activeNodeId, activeNodeId === id)
                return activeNodeId === id
              },
              isExpanded: (obj: any, args: any, context: any, info: any) => {
                console.log(`🦁`, obj, args, context, info)
                return false
              }
            }
          }
        }

        memoryCache.writeData({
          data: {
            navigatorTree: [],
            activeNavigatorTreeNode: null
          }
        })

        apollo.create(options, key)
      })
  }
}
