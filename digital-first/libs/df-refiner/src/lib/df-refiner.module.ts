import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DfPipesModule } from '@digital-first/df-pipes'
import { DfThemeModule } from '@digital-first/df-theme'
import {
  MetadataRefinerComponent,
  RefinerActionService
} from './metadata-refiner/metadata-refiner.component'
import { NgSelectModule } from '@ng-select/ng-select'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MdcDrawerModule } from '@angular-mdc/web'
const COMPONENTS = [MetadataRefinerComponent]
@NgModule({
  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    DfPipesModule,
    DfThemeModule,
    MdcDrawerModule
  ],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
  providers: [RefinerActionService]
})
export class DfRefinerModule {}
