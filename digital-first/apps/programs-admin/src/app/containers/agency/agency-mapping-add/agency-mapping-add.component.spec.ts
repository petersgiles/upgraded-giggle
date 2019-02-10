import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { AgencyMappingAddComponent } from './agency-mapping-add.component'

describe('AgencyMappingAddComponent', () => {
  let component: AgencyMappingAddComponent
  let fixture: ComponentFixture<AgencyMappingAddComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyMappingAddComponent ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyMappingAddComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})