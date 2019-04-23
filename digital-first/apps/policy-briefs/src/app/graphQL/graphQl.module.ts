import { NgModule } from '@angular/core'
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { ApolloModule, Apollo } from 'apollo-angular'
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http'
import { RestLink } from 'apollo-link-rest'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { CachePersistor } from 'apollo-cache-persist'
import { environment } from '../../environments/environment'
import { BrowserModule } from '@angular/platform-browser'
import gql from 'graphql-tag'
import { GetPackNavigationDocument } from '../generated/graphql'

@NgModule({
  imports: [BrowserModule, HttpClientModule, ApolloModule, HttpLinkModule],
  exports: [HttpClientModule, ApolloModule, HttpLinkModule]
})
export class GraphQLModule {
  constructor(apollo: Apollo, private httpClient: HttpClient) {
    const memoryCache = new InMemoryCache()

    const persistor = new CachePersistor({
      cache: memoryCache,
      storage: window.localStorage
    })

    const GET_ACTIVE_NAVIGATOR_TREE_NODE = gql`
      query GetActiveNavigatorTreeNode {
        activeNavigatorTreeNode @client
      }
    `

    Object.keys(environment.datasources)
      .filter(key => environment.datasources[key].type === 'sharepoint')
      .forEach(key => {
        const options = {
          cache: memoryCache,
          link: new RestLink({
            uri: environment.datasources[key].dataServiceUrl
          })
        }

        apollo.create(options, key)
      })

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
              toggleExpandPackNavigationNode: (_root, variables, { cache }) => {
                const query = GetPackNavigationDocument

                const nodes = cache.readQuery({ query })

                const node = nodes.navigatorTree.find(
                  p => p.id === variables.input.id
                )
                node.isExpanded = !node.isExpanded

                const data = { ...nodes }

                data.navigatorTree.filter(p => p.id !== node.id)
                data.navigatorTree.push(node)

                // tslint:disable-next-line: no-console
                console.log(`🐷 toggleExpandPackNavigationNode`, data)

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

                cache.writeData({ data: { activeNavigatorTreeNode: input.id } })
     

                return true
              }
            },
            NavigatorTreeNode: {
              isActive: ({ id }, _, { cache }) => {
                const activeNodeId = cache.readQuery({
                  query: GET_ACTIVE_NAVIGATOR_TREE_NODE
                })
                // tslint:disable-next-line: no-console
                console.log(
                  `🐯 isActive `,
                  id,
                  activeNodeId,
                  activeNodeId === id
                )
                return activeNodeId === id
              },
              isExpanded: (obj: any, _, { cache}) => {

                // const query = GetPackNavigationDocument

                // const nodes = cache.readQuery({ query })

                 const found = null //nodes.find(p => p.id === obj.id)


                // tslint:disable-next-line: no-console
                console.log(`🦁 isExpanded `, obj, cache)
                return !!found
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
