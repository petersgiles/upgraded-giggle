import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DeckComponent } from './deck/deck.component'
import { ChartsModule } from 'ng2-charts/ng2-charts'
import { NgSelectModule } from '@ng-select/ng-select'
import { BrowserModule } from '@angular/platform-browser'
import { ReactiveFormsModule } from '@angular/forms'
import {
  MdcCardModule,
  MdcButtonModule,
  MdcIconModule,
  MdcIconButtonModule,
  MdcFormFieldModule,
  MdcListModule,
  MdcSelectModule,
  MdcTextFieldModule,
  MdcRippleModule
} from '@angular-mdc/web'

import { NgxWigModule } from 'ngx-wig'
import { CardTitleComponent } from './parts/card-title/card-title.component'

const COMPONENTS = [DeckComponent, CardTitleComponent]

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    ChartsModule,
    NgSelectModule,
    MdcButtonModule,
    MdcIconModule,
    MdcIconButtonModule,
    MdcCardModule,
    MdcFormFieldModule,
    MdcListModule,
    MdcSelectModule,
    MdcTextFieldModule,
    MdcRippleModule,
    NgxWigModule,
    ReactiveFormsModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class DeckModule {}
