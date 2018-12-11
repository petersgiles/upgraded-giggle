import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { AgmCoreModule } from '@agm/core'
import { NgSelectModule } from '@ng-select/ng-select'
import { DfPipesModule } from '@digital-first/df-pipes'
import { DfThemeModule } from '@digital-first/df-theme'

import { ContactCardComponent } from './contact-card/contact-card.component'
import { PageTitleComponent } from './page-title.component'
import { ExpandCollapseButtonComponent } from './expand-collapse-button.component'
import { DateFormatButtonComponent } from './date-format-button.component'
import { AutosaveToggleButtonComponent } from './autosave-toggle-button.component'
import { AddItemButtonComponent } from './add-item-button.component'
import { ShareButtonComponent } from './share-button.component'
import { AddNotificationButtonComponent } from './add-notification-button.component'
import { ArchiveButtonComponent } from './archive-button.component'
import { RelatedArtifactsComponent } from './related-artifacts/related-artifacts.component'
import { TagsComponent } from './tags/tags.component'
import { ViewLayoutButtonComponent } from './view-layout-button.component'
import { MetadataRefinerComponent } from './metadata-refiner/metadata-refiner.component'
import { DataTableComponent } from './data-table/data-table.component'
import { BusyComponent } from './busy.component'
import { MapComponent } from './map/map.component'
import { ElectorateSelectorComponent } from './electorate-selector/electorate-selector.component'
import { NavigateButtonComponent } from './navigation-button.component'
import { AvatarComponent } from './avatar/avatar.component'
import { AddSubscriptionButtonComponent } from './subscriber-button.component'
import { InfoComponent } from './info/info.component'
import { PrintPageButtonComponent } from './print-page-button.component'
import { EditorComponent } from './editor/editor.component'

const COMPONENTS = [
  TagsComponent,
  ViewLayoutButtonComponent,
  ContactCardComponent,
  PageTitleComponent,
  ExpandCollapseButtonComponent,
  NavigateButtonComponent,
  DateFormatButtonComponent,
  AddSubscriptionButtonComponent,
  AutosaveToggleButtonComponent,
  AddItemButtonComponent,
  ShareButtonComponent,
  AddNotificationButtonComponent,
  ArchiveButtonComponent,
  RelatedArtifactsComponent,
  MetadataRefinerComponent,
  PrintPageButtonComponent,
  DataTableComponent,
  BusyComponent,
  MapComponent,
  ElectorateSelectorComponent,
  AvatarComponent,
  InfoComponent,
  EditorComponent
]

@NgModule({
  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule,
    DfPipesModule,
    DfThemeModule
  ],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS]
})
export class DfComponentsModule { }
