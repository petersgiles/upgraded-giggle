import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { SimpleLayoutComponent } from './simple-layout/simple-layout.component'
import { FullLayoutComponent } from './full-layout/full-layout.component'
import { DfThemeModule } from '@digital-first/df-theme'
import { FullLayoutService } from './full-layout/full-layout.service'
import { DfComponentsModule } from '@digital-first/df-components'
import { TitleLayoutComponent } from './title-layout/title-layout.component'
import { TitleLayoutService } from './title-layout/title-layout.service'
import { AvatarModule } from '@df/components'

const COMPONENTS = [
  SimpleLayoutComponent,
  TitleLayoutComponent,
  FullLayoutComponent
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AvatarModule,
    DfThemeModule,
    DfComponentsModule
  ],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
  providers: [TitleLayoutService, FullLayoutService]
})
export class DfLayoutsModule {}
