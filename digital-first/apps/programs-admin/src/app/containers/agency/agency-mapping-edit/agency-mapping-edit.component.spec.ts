import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { AgencyMappingEditComponent } from './agency-mapping-edit.component'

describe('AgencyMappingEditComponent', () => {
  let component: AgencyMappingEditComponent
  let fixture: ComponentFixture<AgencyMappingEditComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyMappingEditComponent ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyMappingEditComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})