import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DfPipesModule } from '@digital-first/df-pipes'
import { DfThemeModule } from '@digital-first/df-theme'
import { MetadataRefinerComponent } from './metadata-refiner/metadata-refiner.component'
import { NgSelectModule } from '@ng-select/ng-select'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

const COMPONENTS = [
  MetadataRefinerComponent,
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
export class DfRefinerModule {}
