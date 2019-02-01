import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DfPipesModule } from '@digital-first/df-pipes'
import { DfThemeModule } from '@digital-first/df-theme'
import { ExportButtonComponent } from './export-button.component'
import { ClearButtonComponent } from './clear-button.component'
import { ViewLayoutButtonComponent } from './view-layout-button.component'
import { ExpandCollapseButtonComponent } from './expand-collapse-button.component'
import { NavigateButtonComponent } from './navigation-button.component'
import { DateFormatButtonComponent } from './date-format-button.component'
import { AddSubscriptionButtonComponent } from './subscriber-button.component'
import { AutosaveToggleButtonComponent } from './autosave-toggle-button.component'
import { AddItemButtonComponent } from './add-item-button.component'
import { ShareButtonComponent } from './share-button.component'
import { AddNotificationButtonComponent } from './add-notification-button.component'
import { ArchiveButtonComponent } from './archive-button.component'
import { PrintPageButtonComponent } from './print-page-button.component'
import { DeleteItemButtonComponent } from './delete-item-button.component'
import { EditItemButtonComponent } from './edit-item-button.component'

const COMPONENTS = [
  ClearButtonComponent,
  ExportButtonComponent,
  ViewLayoutButtonComponent,
  ExpandCollapseButtonComponent,
  NavigateButtonComponent,
  DateFormatButtonComponent,
  AddSubscriptionButtonComponent,
  AutosaveToggleButtonComponent,
  AddItemButtonComponent,
  ShareButtonComponent,
  AddNotificationButtonComponent,
  ArchiveButtonComponent,
  PrintPageButtonComponent,
  DeleteItemButtonComponent,
  EditItemButtonComponent
]

@NgModule({
  imports: [
    CommonModule,
    DfPipesModule,
    DfThemeModule
  ],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS]
})
export class DfButtonsModule {}
