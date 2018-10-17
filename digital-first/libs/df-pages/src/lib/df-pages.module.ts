import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ErrorPageNotFoundComponent } from './error-page-not-found/error-page-not-found.component'
import { ErrorServerComponent } from './error-server/error-server.component'
import { LoginComponent } from './login/login.component'

const COMPONENTS = [ErrorPageNotFoundComponent, ErrorServerComponent, LoginComponent]

@NgModule({
  imports: [CommonModule],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
})
export class DfPagesModule {}
