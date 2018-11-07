import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DfThemeModule } from '@digital-first/df-theme'
import { ErrorPageNotFoundComponent } from './error-page-not-found/error-page-not-found.component'
import { ErrorServerComponent } from './error-server/error-server.component'

const COMPONENTS = [
  ErrorPageNotFoundComponent,
  ErrorServerComponent,
]

@NgModule({
  imports: [
    CommonModule,
    DfThemeModule
  ],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
})
export class DfPagesModule { }
