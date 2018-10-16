import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SimpleLayoutComponent } from './simple-layout/simple-layout.component'

@NgModule({
  imports: [CommonModule],
  declarations: [SimpleLayoutComponent],
  exports: [SimpleLayoutComponent]
})
export class DfLayoutsModule {}
