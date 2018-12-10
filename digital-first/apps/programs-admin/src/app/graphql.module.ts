import {NgModule} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {ApolloModule, APOLLO_OPTIONS, Apollo} from 'apollo-angular';
import {HttpLinkModule, HttpLink} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {environment} from "../environments/environment";
import {split} from 'apollo-link';
import {getMainDefinition} from 'apollo-utilities';

const queryUri = environment.datasource.dataServiceUrl;
const mutationsUri = environment.datasource.adminDataServiceUrl;

@NgModule({
  exports: [HttpClientModule, ApolloModule, HttpLinkModule],
})
export class GraphQLModule {
  constructor(apollo: Apollo, private httpClient: HttpClient) {

    //queries go via the programs api
    const httpQueryLink = new HttpLink(this.httpClient).create({
      uri: queryUri,
      method: 'GET'
    });

    //mutations go via the programs admin api
    const httpMutationLink = new HttpLink(this.httpClient).create({
      uri: mutationsUri
    });

    //create a combined link that will split and direct to a particular link based on the operation.
    //in our case, all mutations should go to the admin programs api url, where as query will go via the
    //programs api.  this may be too simple as the app develops and may need to send some queries to the admin api
    const link = split(
      ({query}) => {
        const {kind, operation} = getMainDefinition(query);
        return kind === 'OperationDefinition' && operation === 'mutation';
      },
      httpMutationLink,
      httpQueryLink
    );

    apollo.create({
      link,
      cache: new InMemoryCache()
    });
  }
}

