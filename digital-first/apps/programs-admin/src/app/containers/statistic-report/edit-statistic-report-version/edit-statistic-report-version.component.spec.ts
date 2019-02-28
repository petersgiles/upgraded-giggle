import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { EditStatisticReportVersionComponent } from './edit-statistic-report-version.component'

describe('EditStatisticReportVersionComponent', () => {
  let component: EditStatisticReportVersionComponent
  let fixture: ComponentFixture<EditStatisticReportVersionComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditStatisticReportVersionComponent]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(EditStatisticReportVersionComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
