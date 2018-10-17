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
import { DfPagesModule } from '@digital-first/df-pages'

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    NxModule.forRoot(),
    DfLayoutsModule,
    DfThemeModule,
    DfDiscussionModule,
    DfPagesModule,
    AppRoutingModule
  ],
  providers: [
    { provide: FullLayoutService, useClass: AppFullLayoutService},
    { provide: 'Window', useValue: window }],
  bootstrap: [AppComponent]
})
export class AppModule {}
