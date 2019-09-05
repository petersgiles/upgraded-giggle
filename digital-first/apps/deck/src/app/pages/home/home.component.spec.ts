import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, ActivatedRoute, convertToParamMap } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import * as fromDeck from '../../reducers/deck/deck.reducer';
import { RouterTestingModule } from '@angular/router/testing';
import { DeckItem, DigitalFirstDeckModule } from '../../components/deck';
import { PanelModule, ButtonModule } from '@df/components';
import { deckData, briefs } from '../../reducers/deck/local/data';
import { FormBuilder } from '@angular/forms';
import { MdcDialogModule, Overlay } from '@angular-mdc/web';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockStore: MockStore<any>;
  let actions$: Observable<any>;

  const initialState: fromDeck.State = fromDeck.initialState;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        PanelModule,
        DigitalFirstDeckModule,
        ButtonModule,
        MdcDialogModule,
        RouterTestingModule.withRoutes([
          {
            path: '/',
            component: HomeComponent
          }
        ])
      ],
      providers: [
        Overlay,
        FormBuilder,
        {
          provide: Router,
          useValue: { get: jest.fn() }
        },
        {
          provide: Store,
          useValue: {
            pipe: jest.fn()
          }
        },
        {
          provide: ActivatedRoute,
          useValue: { paramMap: of(convertToParamMap({ parent: '' })) }
        },
        provideMockActions(() => actions$),
        provideMockStore({ initialState })
      ],
      declarations: [HomeComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.get(Store);
    let state = {
      ...initialState,
      deckItems: deckData.data,
      briefs: briefs,
      currentParent: null,
      selectedCard: '7'
    };
    mockStore.setState(state);
    mockStore.overrideSelector(
      fromDeck.selectCurrentParentState,
      state.currentParent
    );
    mockStore.overrideSelector(fromDeck.selectDeckItemsState, state.deckItems);
    mockStore.overrideSelector(
      fromDeck.selectSelectedCardState,
      state.selectedCard
    );
    mockStore.overrideSelector(fromDeck.selectCurrentBriefsState, state.briefs);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
