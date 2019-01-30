import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { ReportuploadComponent } from './reportupload.component'

describe('ReportuploadComponent', () => {
  let component: ReportuploadComponent
  let fixture: ComponentFixture<ReportuploadComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportuploadComponent ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportuploadComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
