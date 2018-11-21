import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { SimpleLayoutComponent } from './simple-layout/simple-layout.component'
import { FullLayoutComponent } from './full-layout/full-layout.component'
import { DfThemeModule } from '@digital-first/df-theme'
import { FullLayoutService } from './full-layout/full-layout.service'
import { DfComponentsModule } from '@digital-first/df-components'

const COMPONENTS = [SimpleLayoutComponent, FullLayoutComponent]

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DfThemeModule,
    DfComponentsModule
  ],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
  providers: [FullLayoutService]
})
export class DfLayoutsModule { }
