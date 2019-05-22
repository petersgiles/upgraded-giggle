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
import {
  CardActionsComponent,
  CardDataComponent,
  CardSupportingTextComponent,
  CardMenuComponent
} from './parts'
import { EditCardComponent } from './editor/edit-card/edit-card.component'
import {
  StandardCardComponent,
  RefinerCardComponent,
  ParentCardComponent,
  MarkdownCardComponent,
  EmbedCardComponent,
  ChartCardComponent,
  AudioCardComponent,
  ImageCardComponent,
  VideoCardComponent
} from './cards'

const COMPONENTS = [
  DeckComponent,
  EditCardComponent,
  CardTitleComponent,
  CardActionsComponent,
  CardDataComponent,
  CardSupportingTextComponent,
  CardMenuComponent,
  StandardCardComponent,
  RefinerCardComponent,
  ParentCardComponent,
  MarkdownCardComponent,
  EmbedCardComponent,
  ChartCardComponent,
  AudioCardComponent,
  ImageCardComponent,
  VideoCardComponent
]

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
export class DigitalFirstDeckModule {}
