import { async, ComponentFixture, TestBed } from "@angular/core/testing"

import { DeckComponent } from "./deck.component"
import { BaseChartDirective, ChartsModule } from "ng2-charts/ng2-charts"
import { NgxWigModule } from "ngx-wig"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import {
  MdcCardModule,
  MdcButtonModule,
  MdcIconModule,
  MdcIconButtonModule,
  MdcFormFieldModule,
  MdcTextFieldModule,
  MdcRippleModule,
  MdcListModule,
  MdcSelectModule
} from "@angular-mdc/web"
import { NgSelectModule } from "@ng-select/ng-select"
import { BrowserModule } from "@angular/platform-browser"

describe("DeckComponent", () => {
  let component: DeckComponent
  let fixture: ComponentFixture<DeckComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        ReactiveFormsModule,
        NgSelectModule,
        FormsModule,
        MdcButtonModule,
        MdcIconModule,
        MdcIconButtonModule,
        MdcCardModule,
        MdcListModule,
        MdcFormFieldModule,
        MdcTextFieldModule,
        MdcSelectModule,
        NgxWigModule,
        MdcRippleModule,
        MdcListModule
      ],
      declarations: [DeckComponent, BaseChartDirective]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(DeckComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
