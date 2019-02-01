import { BrowserModule } from '@angular/platform-browser'
import { NgModule, APP_INITIALIZER } from '@angular/core'

import { AppComponent } from './app.component'
import { NxModule } from '@nrwl/nx'

import { WINDOW_PROVIDERS } from '@digital-first/df-utils'
import { DfLayoutsModule, FullLayoutService } from '@digital-first/df-layouts'
import { DfThemeModule } from '@digital-first/df-theme'
import { DfPipesModule } from '@digital-first/df-pipes'
import { DfLoggingModule } from '@digital-first/df-logging'
import { DfComponentsModule } from '@digital-first/df-components'
import { DfMomentModule } from '@digital-first/df-moment'
import { DfDiscussionModule } from '@digital-first/df-discussion'
import { DfPagesModule } from '@digital-first/df-pages'
import { DfDialogsModule } from '@digital-first/df-dialogs'
import { DfSharepointModule } from '@digital-first/df-sharepoint'

import { HomeComponent } from './pages/home/home.component'
import { AppFullLayoutService } from './app-full-layout.service'
import { AppRoutingModule } from './app-routing.module'
import { DeckDataService } from './services/deck-data.service'
import { GraphQLModule } from './graphql.module'
import { DeckComponent } from './containers/deck/deck.component'
import { DragDropModule } from '@angular/cdk/drag-drop'
import { CardComponent } from './components/card/card.component'
import { DfDatatableModule } from '@digital-first/df-datatable'
import { DfButtonsModule } from '@digital-first/df-buttons'
import { DfMapModule } from '@digital-first/df-map'

export function initApplication(): Function {
  return () => new Promise(resolve => {
    // tslint:disable-next-line:no-console
    console.log('app initialise started...')
    resolve(true)
  })
}

@NgModule({
  declarations: [AppComponent, HomeComponent, DeckComponent, CardComponent],
  imports: [
    BrowserModule,
    NxModule.forRoot(),
    GraphQLModule,
    DfLoggingModule,
    DfComponentsModule,
    DfDatatableModule,
    DfButtonsModule,
    DfMapModule,
    DfMomentModule,
    DfLayoutsModule,
    DfThemeModule,
    DfDiscussionModule,
    DfPagesModule,
    DfDialogsModule,
    DfSharepointModule,
    DfPipesModule,
    AppRoutingModule,
    DragDropModule
  ],
  providers: [
    WINDOW_PROVIDERS,
    {
      provide: APP_INITIALIZER,
      useFactory: initApplication,
      deps: [],
      multi: true
    },
    DeckDataService,
    { provide: FullLayoutService, useClass: AppFullLayoutService },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
