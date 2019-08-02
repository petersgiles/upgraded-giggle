import 'core-js/es7/reflect'
import 'zone.js/dist/zone'
import 'zone.js/dist/proxy';
import 'zone.js/dist/async-test';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';
import 'jest-zone-patch' 


import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { RouterTestingModule } from '@angular/router/testing'
import { ConfigureFn, configureTests } from '../../../../../../../libs/df-testing'
import { Router } from '@angular/router'
import { DeckComponent } from './deck.component'
import { ParentCardComponent } from '../cards/parent-card/parent-card.component'

describe('DeckComponent', () => {

  let component: DeckComponent
  let fixture: ComponentFixture<DeckComponent>
  let router: Router

  beforeEach(async(() => {
    const configure: ConfigureFn = testBed => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      
      ],
      providers: [ {
        provide: Router,
        useValue: {navigate: jest.fn()}
      }, ],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [DeckComponent]
    })
  }
  configureTests(configure).then(testBed => {
   fixture = TestBed.createComponent(DeckComponent)
   component = fixture.componentInstance;
   router = TestBed.get(Router)
   fixture.detectChanges();
 })
 
}))

   it('should create', () => {
    expect(component).toBeTruthy()
  }) 

  it('should emit onAction event', (done) => {
    let action = {actions: [{title: 'Get Started', url: '/dashboard',cardType: 'Parent',colour: 'IGBGreen', data: false,
    id: '2',media: null,parent: null, size: '4', sortOrder: '9', 
    supportingText: `<div class='ExternalClassEC844ABB266C4CF7857F776E0B745CCF'><p>test </p></div>`, titleClass: 'IGBGreen'}]}

    let parentCard = new ParentCardComponent();
    parentCard.onAction.subscribe(res => {
       expect(res.actions[0].title).toEqual('Get Started');
       done();
    });
    parentCard.onAction.emit(action)
})
})
