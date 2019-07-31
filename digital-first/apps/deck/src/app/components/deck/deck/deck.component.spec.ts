import 'core-js/es7/reflect'
import 'zone.js/dist/zone'
import "zone.js/dist/proxy";
import 'zone.js/dist/async-test';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';
import 'jest-zone-patch' 


import { async, ComponentFixture, TestBed } from "@angular/core/testing"
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { RouterTestingModule } from '@angular/router/testing'
import { ConfigureFn, configureTests } from '../../../../../../../libs/df-testing'
import { Router } from '@angular/router'
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
  let router: Router

  beforeEach(async(() => {
    const configure: ConfigureFn = testBed => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
       /*  BrowserModule,
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
        MdcListModule,
        ChartsModule */
      ],
      providers: [ {
        provide: Router,
        useValue: {navigate: jest.fn()}
      }, ],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [DeckComponent/*, BaseChartDirective*/]
    })
  }
  configureTests(configure).then(testBed => {
   fixture = TestBed.createComponent(DeckComponent)
   component = fixture.componentInstance;
   router = TestBed.get(Router)
   fixture.detectChanges();

   //router.initialNavigation() 
 })
 
}))

  

   it("should create", () => {
    expect(component).toBeTruthy()
  }) 
})
