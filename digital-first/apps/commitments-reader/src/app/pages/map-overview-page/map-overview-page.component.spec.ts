import { Store } from '@ngrx/store'
import { provideMockStore, MockStore } from '@ngrx/store/testing'
import { TestBed } from '@angular/core/testing'
import { MapOverviewPageComponent } from './map-overview-page.component'
import * as fromMap from '../../reducers/map/map.reducer'
import { MdcElevationModule } from '@angular-mdc/web'
import * as fromRefiner from '../../reducers/refiner/refiner.reducer'
import { render } from '@testing-library/angular'
import { AgmCoreModule, MapsAPILoader } from '@agm/core'
import { RouterTestingModule } from '@angular/router/testing'
import { DataTableModule } from '@df/components'

test('can create component', async () => {
  const component = await render(MapOverviewPageComponent, {
    imports: [
      MdcElevationModule,
      DataTableModule,
      AgmCoreModule,
      RouterTestingModule
    ],
    providers: [
      {
        provide: MapsAPILoader,
        useValue: {
          load: jest.fn().mockReturnValue(new Promise(resolve => resolve(true)))
        }
      },
      provideMockStore({
        selectors: [
          {
            selector: fromRefiner.selectRefinerGroups,
            value: {}
          },
          {
            selector: fromMap.selectRefinedMapPointsState,
            value: getMapPoints()
          }
        ]
      })
    ]
  })
  const store = TestBed.get(Store) as MockStore<any>
  store.dispatch = jest.fn()
  expect(component).toBeTruthy()
})

function getMapPoints() {
  const data = [
    {
      id: 77,
      placeId: 'ChIJYQsiGslnTSoRzuH8N97a5mY',
      title: 'Kalgoorlie - Boulder WA, Australia',
      latitude: -30.749,
      longitude: 121.466,
      commitmentMapPoints: [
        {
          commitment: {
            commitmentType: { id: 1, title: 'National' },
            criticalDate: { id: 1, title: 'Budget' },
            id: 144,
            portfolioLookup: { id: 9, title: 'Health' },
            portfolioLookupId: 9,
            title: '20 New Medicare Subsidised MRI Licences'
          }
        }
      ]
    }
  ]
  return data
}
