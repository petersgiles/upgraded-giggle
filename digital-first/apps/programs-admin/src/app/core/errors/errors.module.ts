import {NgModule, ErrorHandler} from '@angular/core'
import {CommonModule} from '@angular/common'
import {RouterModule} from '@angular/router'
import {ErrorsHandler} from './errors-handler/errors-handler'
import {ErrorRoutingModule} from './errors-routing/errors-routing.module'
import {ErrorsComponent} from './errors-component/errors.component'
import {DfThemeModule} from '@digital-first/df-theme'

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DfThemeModule,
    ErrorRoutingModule
  ],
  declarations: [
    ErrorsComponent
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: ErrorsHandler
    }]
})
export class ErrorsModule {
}
