
import { TestBed } from '@angular/core/testing'
import { OverviewPageComponent } from './overview-page.component'
import { Store } from '@ngrx/store'
import { provideMockStore, MockStore } from '@ngrx/store/testing'
import * as fromOverview from '../../reducers/overview/overview.reducer'
import * as fromRefiner from '../../reducers/refiner/refiner.reducer'
import { render } from '@testing-library/angular'
import { DataTableModule } from '@df/components'
import { RouterTestingModule } from '@angular/router/testing'

test('Can create overview component', async () => {
  const component = await render(OverviewPageComponent, {
    imports: [DataTableModule, RouterTestingModule],
    providers: [
      provideMockStore({
        selectors: [
          {
            selector: fromRefiner.selectRefinerGroups,
            value: getRefiners()
          },
          {
            selector: fromOverview.selectRefinedCommitmentsColumnsState,
            value: fromOverview.initialState.columns
          },
          {
            selector: fromOverview.selectFilteredCommitmentsState,
            value: getCommitments()
          }
        ]
      })
    ]
  })
  const store = TestBed.get(Store) as MockStore<any>
  store.dispatch = jest.fn()
  expect(component).toBeTruthy()
})

function getCommitments() {
  const data = [
    {
      id: 10,
      title: 'ARIA Music Teacher Award',
      bookType: 'Red',
      politicalParty: 'Australian Labor Party',
      announcedBy: null,
      displayOrder: undefined,
      portfolio: 'Communications and the Arts',
      commitmentType: 'International',
      criticalDate: undefined
    }
  ]

  return data
}

function getRefiners() {
  const refiners = [
    {
      children: [
        {
          cascadGroups: [],
          children: undefined,
          expanded: false,
          group: 'commitmentTypes',
          groupBy: '',
          id: 1,
          selected: false,
          singleSelection: true,
          title: 'National'
        },
        {
          cascadGroups: ['states'],
          children: undefined,
          expanded: false,
          group: 'commitmentTypes',
          groupBy: '',
          id: 2,
          selected: false,
          singleSelection: true,
          title: 'State'
        },
        {
          cascadGroups: ['electorates'],
          children: undefined,
          expanded: false,
          group: 'commitmentTypes',
          groupBy: '',
          id: 3,
          selected: false,
          singleSelection: true,
          title: 'Electorate'
        },
        {
          cascadGroups: [],
          children: undefined,
          expanded: false,
          group: 'commitmentTypes',
          groupBy: '',
          id: 4,
          selected: false,
          singleSelection: true,
          title: 'International'
        }
      ],
      enableSlide: undefined,
      expanded: false,
      group: 'commitmentTypes',
      id: undefined,
      selected: false,
      title: 'Commitment Types'
    },
    {
      children: [
        {
          cascadGroups: [],
          children: undefined,
          expanded: false,
          group: 'electorates',
          groupBy: undefined,
          id: 1,
          selected: false,
          singleSelection: undefined,
          title: 'Adelaide'
        },
        {
          cascadGroups: [],
          children: undefined,
          expanded: false,
          group: 'electorates',
          groupBy: undefined,
          id: 2,
          selected: false,
          singleSelection: undefined,
          title: 'Aston'
        }
      ],
      enableSlide: true,
      expanded: false,
      group: 'electorates',
      id: undefined,
      selected: false,
      title: 'Electorates'
    },
    {
      children: [
        {
          cascadGroups: [],
          children: undefined,
          expanded: false,
          group: 'states',
          groupBy: '',
          id: 1,
          selected: false,
          singleSelection: undefined,
          title: 'SA'
        },
        {
          cascadGroups: [],
          children: undefined,
          expanded: false,
          group: 'states',
          groupBy: '',
          id: 2,
          selected: false,
          singleSelection: undefined,
          title: 'VIC'
        }
      ],
      enableSlide: undefined,
      expanded: false,
      group: 'states',
      id: undefined,
      selected: false,
      title: 'States'
    },
    {
      children: [
        {
          cascadGroups: [],
          children: undefined,
          expanded: false,
          group: 'criticalDates',
          groupBy: '',
          id: 1,
          selected: false,
          singleSelection: undefined,
          title: 'Budget'
        },
        {
          cascadGroups: [],
          children: undefined,
          expanded: false,
          group: 'criticalDates',
          groupBy: '',
          id: 2,
          selected: false,
          singleSelection: undefined,
          title: 'First 100 days'
        }
      ],
      enableSlide: undefined,
      expanded: false,
      group: 'criticalDates',
      id: undefined,
      selected: false,
      title: 'Critical Date'
    },
    {
      children: [
        {
          cascadGroups: [],
          children: undefined,
          expanded: false,
          group: 'portfolioLookups',
          groupBy: '',
          id: 1,
          selected: false,
          singleSelection: undefined,
          title: 'Agriculture and Water Resources'
        },
        {
          cascadGroups: [],
          children: undefined,
          expanded: false,
          group: 'portfolioLookups',
          groupBy: '',
          id: 2,
          selected: false,
          singleSelection: undefined,
          title: "Attorney-General's"
        }
      ],
      enableSlide: undefined,
      expanded: false,
      group: 'portfolioLookups',
      id: undefined,
      selected: false,
      title: 'Portfolios'
    },
    {
      children: [],
      enableSlide: undefined,
      expanded: false,
      group: 'deckItemBriefSummaries',
      id: undefined,
      selected: false,
      title: 'Theme'
    }
  ]
  return refiners
}
