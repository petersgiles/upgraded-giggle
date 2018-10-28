import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { ContactCardComponent } from './contact-card/contact-card.component'
import { PageTitleComponent } from './page-title.component'
import { ExpandCollapseButtonComponent } from './expand-collapse-button.component'
import { DateFormatButtonComponent } from './date-format-button.component'
import { AddItemButtonComponent } from './add-item-button.component'
import { ShareButtonComponent } from './share-button.component'
import { AddNotificationButtonComponent } from './add-notification-button.component'
import { ArchiveButtonComponent } from './archive-button.component'
import { RelatedArtifactsComponent } from './related-artifacts/related-artifacts.component'
import { TagsComponent } from './tags/tags.component'
import { ViewLayoutButtonComponent } from './view-layout-button.component'
import { DfThemeModule } from '@digital-first/df-theme'

const COMPONENTS = [
  TagsComponent,
  ViewLayoutButtonComponent,
  ContactCardComponent,
  PageTitleComponent,
  ExpandCollapseButtonComponent,
  DateFormatButtonComponent,
  AddItemButtonComponent,
  ShareButtonComponent,
  AddNotificationButtonComponent,
  ArchiveButtonComponent,
  RelatedArtifactsComponent
]

@NgModule({
  imports: [
    CommonModule,
    DfThemeModule
  ],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS]
})
export class DfComponentsModule { }
