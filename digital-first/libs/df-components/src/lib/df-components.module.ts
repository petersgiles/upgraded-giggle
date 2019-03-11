import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { NgSelectModule } from '@ng-select/ng-select'
import { DfPipesModule } from '@digital-first/df-pipes'
import { DfThemeModule } from '@digital-first/df-theme'

import { ContactCardComponent } from './contact-card/contact-card.component'
import { PageTitleComponent } from './page-title.component'
import { RelatedArtifactsComponent } from './related-artifacts/related-artifacts.component'

import { BusyComponent } from './busy.component'
import { ElectorateSelectorComponent } from './electorate-selector/electorate-selector.component'
import { AvatarComponent } from './avatar/avatar.component'
import { InfoComponent } from './info/info.component'
import { DocumentStatusComponent } from './document-status/document-status.component'

const COMPONENTS = [
  ContactCardComponent,
  DocumentStatusComponent,
  PageTitleComponent,
  RelatedArtifactsComponent,
  BusyComponent,
  ElectorateSelectorComponent,
  AvatarComponent,
  InfoComponent,
]
@NgModule({
  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    DfPipesModule,
    DfThemeModule
  ],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS]
})
export class DfComponentsModule {}
