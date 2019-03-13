import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import {
  MdcButtonModule,
  MdcCardModule,
  MdcChipsModule,
  MdcCheckboxModule,
  MdcDialogModule,
  MdcDrawerModule,
  MdcElevationModule,
  MdcFabModule,
  MdcFormFieldModule,
  MdcIconModule,
  MdcImageListModule,
  MdcLinearProgressModule,
  MdcListModule,
  MdcMenuModule,
  MdcRadioModule,
  MdcRippleModule,
  MdcSelectModule,
  MdcSliderModule,
  MdcSnackbarModule,
  MdcSwitchModule,
  MdcTabBarModule,
  MdcTextFieldModule,
  MdcTopAppBarModule,
  MdcTypographyModule,
  MdcIconButtonModule
} from '@angular-mdc/web'

const MATERIAL_COMPONENTS = [
  MdcButtonModule,
  MdcCardModule,
  MdcChipsModule,
  MdcCheckboxModule,
  MdcDialogModule,
  MdcDrawerModule,
  MdcElevationModule,
  MdcFabModule,
  MdcFormFieldModule,
  MdcIconModule,
  MdcIconButtonModule,
  MdcImageListModule,
  MdcLinearProgressModule,
  MdcListModule,
  MdcMenuModule,
  MdcRadioModule,
  MdcRippleModule,
  MdcSelectModule,
  MdcSliderModule,
  MdcSnackbarModule,
  MdcSwitchModule,
  MdcTabBarModule,
  MdcTextFieldModule,
  MdcTopAppBarModule,
  MdcTypographyModule
]
@NgModule({
  imports: [
    CommonModule,
    ...MATERIAL_COMPONENTS
  ],
  exports: [
    ...MATERIAL_COMPONENTS
  ]
})
export class DfThemeModule { }
