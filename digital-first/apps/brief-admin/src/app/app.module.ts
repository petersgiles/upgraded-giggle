import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppComponent } from './app.component'
import { NxModule } from '@nrwl/nx'
import { HomeComponent } from './containers/home/home.component'
import { AppRoutingModule } from './app-routing.module'
import { DfLayoutsModule } from '@digital-first/df-layouts'
import { DfThemeModule } from '@digital-first/df-theme'
import { DfPagesModule } from '@digital-first/df-pages'

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    NxModule.forRoot(),
    DfLayoutsModule,
    DfThemeModule,
    DfPagesModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
