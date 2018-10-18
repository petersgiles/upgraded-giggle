import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DialogAreYouSureComponent } from './dialog-are-you-sure.component'
import { DialogFileLockedComponent } from './dialog-file-locked.component'
import { DialogShowErrorComponent } from './dialog-show-error.component'
import { DfThemeModule } from '@digital-first/df-theme'
import { DialogSpinnerOverlayComponent } from './dialog-spinner-overlay.component'

const COMPONENTS = [
  DialogAreYouSureComponent,
  DialogFileLockedComponent,
  DialogShowErrorComponent,
  DialogSpinnerOverlayComponent
]

@NgModule({
  imports: [
    CommonModule,
    DfThemeModule
  ],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS]
})
export class DfDialogsModule {}
