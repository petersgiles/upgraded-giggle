import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DfPipesModule } from '@digital-first/df-pipes'
import { DfThemeModule } from '@digital-first/df-theme'
import { MapComponent } from './map/map.component'
import { DfButtonsModule } from '@digital-first/df-buttons'
import { NgSelectModule } from '@ng-select/ng-select'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AgmCoreModule } from '@agm/core'
import { DfDatatableModule } from '@digital-first/df-datatable'

const COMPONENTS = [
  MapComponent
]

@NgModule({
  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule,
    DfButtonsModule,
    DfDatatableModule,
    DfPipesModule,
    DfThemeModule
  ],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS]
})
export class DfMapModule {}
