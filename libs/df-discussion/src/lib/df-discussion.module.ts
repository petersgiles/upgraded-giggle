import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DiscussionComponent } from './discussion/discussion.component'
import { DfThemeModule } from '@digital-first/df-theme'

const COMPONENTS = [DiscussionComponent]

@NgModule({
  imports: [
    CommonModule,
    DfThemeModule
  ],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
})
export class DfDiscussionModule {}
