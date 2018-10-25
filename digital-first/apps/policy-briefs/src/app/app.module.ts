import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppComponent } from './app.component'
import { NxModule } from '@nrwl/nx'
import { HomeComponent } from './containers/home/home.component'
import { AppRoutingModule } from './app-routing.module'
import { DfLayoutsModule, FullLayoutService } from '@digital-first/df-layouts'
import { DfThemeModule } from '@digital-first/df-theme'
import { DfDiscussionModule } from '@digital-first/df-discussion'
import { AppFullLayoutService } from './app-full-layout.service'
import { EffectsModule } from '@ngrx/effects'
import { AppEffects } from './app.effects'

const COMPONENTS = [
  AppComponent,
  HomeComponent
]

// const ENTRYCOMPONENTS = [
//   DiscussionComponent
// ]

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    BrowserModule,
    NxModule.forRoot(),
    DfLayoutsModule,
    DfThemeModule,
    DfDiscussionModule,
    AppRoutingModule,
    EffectsModule.forRoot([AppEffects])
  ],
  providers: [
    { provide: FullLayoutService, useClass: AppFullLayoutService},
    { provide: 'Window', useValue: window }]
  ,
  bootstrap: [AppComponent]
})
export class AppModule {}
