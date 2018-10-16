import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SplitCasePipe } from './split-case.pipe'
import { SafeHtmlPipe } from './safe-html.pipe'
import { NiceNamePipe } from './nice-name.pipe'
import { TruncatePipe } from './truncate.pipe'

const PIPES = [
  SplitCasePipe,
  SafeHtmlPipe,
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
