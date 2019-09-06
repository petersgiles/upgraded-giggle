import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { Router } from '@angular/router'
import { By } from '@angular/platform-browser'
import { DeckComponent } from './deck.component'
import { NgSelectModule } from '@ng-select/ng-select'
import { NgxWigModule } from 'ngx-wig'
import {
  MdcListModule,
  MdcRippleModule,
  MdcTextFieldModule,
  MdcCardModule
} from '@angular-mdc/web'
import { ReactiveFormsModule } from '@angular/forms'
import { EditCardComponent } from '../editor/edit-card/edit-card.component'
import {
  StandardCardComponent,
  RefinerCardComponent,
  ParentCardComponent,
  MarkdownCardComponent,
  EmbedCardComponent,
  ChartCardComponent,
  AudioCardComponent,
  ImageCardComponent,
  VideoCardComponent,
  TestCardComponent
} from '../cards'
import {
  CardMenuComponent,
  CardSupportingTextComponent,
  CardActionsComponent,
  CardTitleComponent,
  CardDataComponent
} from '../parts'
import { ChartsModule } from 'ng2-charts'
import { SafeHtmlPipe } from 'libs/df-pipes/src/lib/safe-html.pipe'
describe('DeckComponent', () => {
  debugger
  let component: DeckComponent
  let fixture: ComponentFixture<DeckComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        MdcTextFieldModule,
        NgSelectModule,
        NgxWigModule,
        MdcListModule,
        MdcRippleModule,
        MdcCardModule,
        ChartsModule
      ],
      providers: [
        SafeHtmlPipe,
        {
          provide: Router,
          useValue: { navigate: jest.fn()}
        },
      ],
      declarations: [
        DeckComponent,
        EditCardComponent,
        StandardCardComponent,
        RefinerCardComponent,
        ParentCardComponent,
        MarkdownCardComponent,
        EmbedCardComponent,
        ChartCardComponent,
        AudioCardComponent,
        ImageCardComponent,
        VideoCardComponent,
        TestCardComponent,
        CardMenuComponent,
        CardSupportingTextComponent,
        CardActionsComponent,
        CardTitleComponent,
        CardDataComponent
      ]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(DeckComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should create new card on click', () => {
    const btn = fixture.debugElement.query(By.css('button'))
  })

  it('should emit onAction event', done => {
    let action = {
      actions: [
        {
          title: 'Get Started',
          url: '/dashboard',
          cardType: 'Parent',
          colour: 'IGBGreen',
          data: false,
          id: '2',
          media: null,
          parent: null,
          size: '4',
          sortOrder: '9',
          supportingText: `<div class='ExternalClassEC844ABB266C4CF7857F776E0B745CCF'><p>test </p></div>`,
          titleClass: 'IGBGreen'
        }
      ]
    }

    let parentCard = new ParentCardComponent()
    parentCard.onAction.subscribe(res => {
      expect(res.actions[0].title).toEqual('Get Started')
      done()
    })
    parentCard.onAction.emit(action)
  })
})
