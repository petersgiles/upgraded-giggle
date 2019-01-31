import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DfPipesModule } from '@digital-first/df-pipes'
import { DfThemeModule } from '@digital-first/df-theme'

@NgModule({
  imports: [
    CommonModule,
    DfPipesModule,
    DfThemeModule
  ]
})
export class DfRefinerModule {}
