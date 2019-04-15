import { BrowserModule } from '@angular/platform-browser'
import { NgModule, APP_INITIALIZER } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AppComponent } from './app.component'
import { NxModule } from '@nrwl/nx'

import { WINDOW_PROVIDERS } from '@df/utils'
import { DfLayoutsModule, TitleLayoutService } from '@digital-first/df-layouts'

import { HomeComponent } from './pages/home/home.component'
import { AppFullLayoutService } from './app-full-layout.service'
import { AppRoutingModule } from './app-routing.module'
import { GraphQLModule } from './graphql.module'
import { DragDropModule } from '@angular/cdk/drag-drop'

import {
  DocumentModule,
  DiscussionModule,
  ButtonModule,
  PanelModule,
  RefinerModule,
  AvatarModule
} from '@df/components'
import { initApplication } from './app-init'
import { PolicyBriefsDataService } from './services/policy-briefs-data.service'
import { BriefComponent } from './pages/brief/brief.component'
import { DfPagesModule } from '@digital-first/df-pages'
import { DfPipesModule } from '@digital-first/df-pipes'
import { getBriefByIdServiceProvider } from './services/getBriefById/get-brief-by-id.service'
import { getPackNavigationServiceProvider } from './services/getPackNavigation/get-pack-navigation.service'

const COMPONENTS = [AppComponent, HomeComponent, BriefComponent]

const ENTRYCOMPONENTS = []

@NgModule({
  declarations: [...COMPONENTS],
  entryComponents: [...ENTRYCOMPONENTS],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NxModule.forRoot(),
    GraphQLModule,
    DfLayoutsModule,
    ButtonModule,
    PanelModule,
    RefinerModule,
    AvatarModule,
    DiscussionModule,
    DocumentModule,
    AppRoutingModule,
    DragDropModule,
    DfPagesModule,
    DfPipesModule
  ],
  providers: [
    WINDOW_PROVIDERS,
    {
      provide: APP_INITIALIZER,
      useFactory: initApplication,
      deps: [],
      multi: true
    },
    PolicyBriefsDataService,
    { provide: TitleLayoutService, useClass: AppFullLayoutService },
    getBriefByIdServiceProvider,
    getPackNavigationServiceProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
