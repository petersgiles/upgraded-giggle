import { configureTests } from '../../../../../../../libs/df-testing'

import { NO_ERRORS_SCHEMA } from '@angular/core'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { Store } from '@ngrx/store'
import { provideMockStore, MockStore } from '@ngrx/store/testing'
import { provideMockActions } from '@ngrx/effects/testing'
import { Observable } from 'rxjs'
import * as fromBrief from '../../../reducers/brief/brief.reducer'
import { BriefProcessingInstructionComponent } from './brief-processing-instruction.component'
import { SafeHtmlPipe } from '../../../../../../../libs/df-pipes/src/lib/safe-html.pipe'
import { DfPipesModule } from '../../../../../../../libs/df-pipes/src/lib/df-pipes.module'

describe('BriefProcessingInstructionComponent', () => {
  let component: BriefProcessingInstructionComponent
  let fixture: ComponentFixture<BriefProcessingInstructionComponent>
  let mockStore: MockStore<any>
  let actions$: Observable<any>

  const initialState: fromBrief.State = fromBrief.initialState

  beforeEach(async(() => {
    const configure = (testBed: TestBed) => {
      testBed.configureTestingModule({
        schemas: [NO_ERRORS_SCHEMA],
        imports: [DfPipesModule],
        declarations: [BriefProcessingInstructionComponent],
        providers: [
          SafeHtmlPipe,
          {
            provide: Store,
            useValue: {
              pipe: jest.fn()
            }
          },
          provideMockActions(() => actions$),
          provideMockStore({ initialState })
        ]
      })
    }
    configureTests(configure).then(testBed => {
      fixture = testBed.createComponent(BriefProcessingInstructionComponent)
      component = fixture.componentInstance
      mockStore = testBed.get(Store)
      let state = { ...initialState, brief: getBrief() }
      mockStore.setState(state)
      mockStore.overrideSelector(fromBrief.selectBriefState, state.brief)

      fixture.detectChanges()
    })
  }))

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should return the brief', () => {
    mockStore.select(fromBrief.selectBriefState).subscribe(brief => {
      expect(brief.reference).toBe('BN:636904955575056876')
    })
  })
})

function getBrief() {
  let brief = {
    briefDivision: { id: 1, title: undefined },
    briefStatus: { id: 1, title: undefined },
    dLM: 'Sensitive Personal',
    dueDate: null,
    editor: { id: null, title: null },
    fileLeafRef: 'LOCALDEV-DAVE-636904955575056876.docx',
    id: 10,
    modified: undefined,
    order: null,
    policy: { id: 1, title: 'Sample Policy' },
    policyDirection: undefined,
    reference: 'BN:636904955575056876',
    securityClassification: 'PROTECTED',
    subPolicy: { id: 1, title: 'SubPolicy One' },
    title: 'The Integration Of Hypothetical Concept'
  }
  return brief
}
