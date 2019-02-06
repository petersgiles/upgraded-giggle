import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { ProjectuploadComponent } from './projectupload.component'

describe('ProjectuploadComponent', () => {
  let component: ProjectuploadComponent
  let fixture: ComponentFixture<ProjectuploadComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectuploadComponent ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectuploadComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
