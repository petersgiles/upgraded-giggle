import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DiscussionComponent } from './discussion/discussion.component'
import { DfThemeModule } from '@digital-first/df-theme'
import { DfComponentsModule } from '@digital-first/df-components'

const COMPONENTS = [DiscussionComponent]

@NgModule({
  imports: [
    CommonModule,
    DfThemeModule,
    DfComponentsModule
  ],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
})
export class DfDiscussionModule {}
