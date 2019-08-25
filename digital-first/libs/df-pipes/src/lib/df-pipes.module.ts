import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SplitCasePipe } from './split-case.pipe'
import { SafeHtmlPipe, SafeHtmlStylePipe } from './safe-html.pipe'
import { NiceNamePipe } from './nice-name.pipe'
import { TruncatePipe } from './truncate.pipe'

const PIPES = [
  SplitCasePipe,
  SafeHtmlPipe,
  SafeHtmlStylePipe,
  NiceNamePipe,
  TruncatePipe
]

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ...PIPES
  ],
  exports: [
    ...PIPES
  ]
})
export class DfPipesModule {}
