import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { NgSelectModule } from '@ng-select/ng-select'
import { DfPipesModule } from '@digital-first/df-pipes'
import { DfThemeModule } from '@digital-first/df-theme'

import { ContactCardComponent } from './contact-card/contact-card.component'
import { PageTitleComponent } from './page-title.component'
import { RelatedArtifactsComponent } from './related-artifacts/related-artifacts.component'

import { MetadataRefinerComponent } from './metadata-refiner/metadata-refiner.component'
import { BusyComponent } from './busy.component'
import { ElectorateSelectorComponent } from './electorate-selector/electorate-selector.component'
import { AvatarComponent } from './avatar/avatar.component'
import { InfoComponent } from './info/info.component'

const COMPONENTS = [
  ContactCardComponent,
  PageTitleComponent,
  RelatedArtifactsComponent,
  MetadataRefinerComponent,
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
