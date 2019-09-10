import { TestBed } from '@angular/core/testing'
import { AppRouterService } from '../../services/app-router.service'
import { CommitmentDetailComponent } from './commitment-detail.component'
import { Store } from '@ngrx/store'
import { provideMockStore, MockStore } from '@ngrx/store/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { ActivatedRoute } from '@angular/router'
import { of } from 'rxjs'
import { Location } from '@angular/common'

import {
  DfMomentModule,
  DateFormatPipe
} from '../../../../../../libs/df-moment/src'
import { SafeHtmlPipe } from '../../../../../../libs/df-pipes/src/lib/safe-html.pipe'
import { DfPipesModule } from '../../../../../../libs/df-pipes/src/lib/df-pipes.module'
import * as fromDetail from '../../reducers/commitment-detail/commitment-detail.reducer'
import * as fromUser from '../../../../../../libs/df-app-core/src/index'

import { render } from '@testing-library/angular'
import { MdcListModule, MdcSelectModule } from '@angular-mdc/web'
import { ReactiveFormsModule } from '@angular/forms'
import { PanelModule } from '@df/components'
test('Can create CommitmentDetialComponent', async () => {
  const initialState = {
    commitment: getCommitment().commitmentDetail.commitment,
    loaded: false,
    handlingAdvices: [],
    errors: [{ message: '', code: '', data: null }],
    user: {
      isSiteAdmin: true,
      login: 'guest',
      name: 'Guest User',
      roles: ['ROLE_OWNERS'],
      systemUserKey: 'guest',
      userid: 0
    },
    operationDefaults: {
      displayorder: 'hide',
      planner: 'hide',
      pmchandlingadvice: 'write',
      pmohandlingadvice: 'write'
    },
    operations: {
      ROLE_MEMBERS: [{ pmchandlingadvice: 'read', pmohandlingadvice: 'read' }],
      ROLE_OWNERS: [{ pmchandlingadvice: 'write', pmohandlingadvice: 'write' }],
      ROLE_VISITORS: [{ pmchandlingadvice: 'hide', pmohandlingadvice: 'hide' }]
    }
  }

  const component = await render(CommitmentDetailComponent, {
    imports: [
      RouterTestingModule,
      DfMomentModule,
      DfPipesModule,
      MdcSelectModule,
      ReactiveFormsModule,
      MdcListModule,
      PanelModule
    ],
    providers: [
      provideMockStore({
        selectors: [
          { selector: fromUser.getUserCurrentUser, value: initialState.user },
          {
            selector: fromUser.getUserCurrentUserPermissions,
            value: initialState.operations
          },
          {
            selector: fromUser.getUserCurrentOperationDefaults,
            value: initialState.operationDefaults
          },
          {
            selector: fromDetail.getCommitmentState,
            value: getCommitment().commitmentDetail.commitment
          },
          { selector: fromDetail.getErrorState, value: initialState.errors },
          {
            selector: fromDetail.getHandlingAdvicesState,
            value: initialState.handlingAdvices
          }
        ]
      }),
      Location,
      AppRouterService,
      DateFormatPipe,
      SafeHtmlPipe,
      { provide: ActivatedRoute, useValue: { params: of({ id: '0' }) } }
    ]
  })
  const store = TestBed.get(Store) as MockStore<any>
  store.dispatch = jest.fn()
  expect(component).toBeTruthy()
  expect(
    component.getByPlaceholderText('PMO Handling Advice').hasChildNodes()
  ).toBeTruthy()
})

function getCommitment() {
  const data = {
    commitmentDetail: {
      commitment: {
        announcedBy: null,
        announcementType: 'Speech',
        bookType: 'Red',
        commitmentType: 'International',
        cost: null,
        criticalDate: 'Undefined',
        date: '2018-10-29T00:00:00+11:00',
        description: `Labor has committed to establish a new Australian government-backed
            infrastructure investment bank offering concessional loans
            and financing for vital, nation-building infrastructure in the Pacific Islands region.&nbsp;`,
        electorates: [],
        id: 20,
        title: '',
        status: '',
        politicalParty: 'ALP',
        pmcHandlingAdvice: {
          label: 'Budget Process',
          value: 'f946e9cb-6e73-433d-998d-549d9ac8b5df'
        },
        pmoHandlingAdvice: {
          label: 'Minister to implement',
          value: 'ee5ba805-8eb4-4031-9528-c40f48e76c55'
        }
      }
    }
  }
  return data
}
