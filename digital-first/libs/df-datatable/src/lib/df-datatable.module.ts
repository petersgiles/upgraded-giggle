import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DfPipesModule } from '@digital-first/df-pipes'
import { DfThemeModule } from '@digital-first/df-theme'
import { DataTableComponent } from './data-table'
import { DataTablePagerComponent } from './data-table-pager'
import { NgSelectModule } from '@ng-select/ng-select'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

const COMPONENTS = [
  DataTableComponent,
  DataTablePagerComponent
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
export class DfDatatableModule {}
