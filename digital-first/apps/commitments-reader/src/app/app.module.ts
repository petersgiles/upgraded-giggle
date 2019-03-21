import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppComponent } from './app.component'
import { HomeComponent } from './pages/home/home.component'
import { AppRoutingModule } from './app-routing.module'
import { DfLayoutsModule } from '@digital-first/df-layouts'
import { DfThemeModule } from '@digital-first/df-theme'
import { DfPagesModule } from '@digital-first/df-pages'
import { DfPipesModule } from '@digital-first/df-pipes'

import {
  DialogAreYouSureComponent,
  DataTableModule,
  PanelModule,
  ButtonModule,
  DialogsModule
} from '@df/components'

const COMPONENTS = [AppComponent, HomeComponent]

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    BrowserModule,
    DataTableModule,
    PanelModule,
    ButtonModule,
    DialogsModule,
    DfLayoutsModule,
    DfThemeModule,
    DfPagesModule,
    DfPipesModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
