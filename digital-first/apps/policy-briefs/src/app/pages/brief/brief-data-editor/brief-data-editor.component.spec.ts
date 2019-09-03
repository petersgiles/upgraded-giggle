import 'core-js/es7/reflect'
import 'zone.js/dist/zone'
import 'zone.js/dist/proxy'
import 'zone.js/dist/async-test'
import 'zone.js/dist/proxy.js'
import 'zone.js/dist/sync-test'
import 'jest-zone-patch'

import {
  ConfigureFn,
  configureTests
} from '../../../../../../../libs/df-testing'
import { Store, createSelector } from '@ngrx/store'
import { provideMockStore, MockStore } from '@ngrx/store/testing'
import { provideMockActions } from '@ngrx/effects/testing'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { BriefDataEditorComponent } from './brief-data-editor.component'
import {
  ParamMap,
  ActivatedRoute,
  Router,
  convertToParamMap
} from '@angular/router'
import { FormBuilder } from '@angular/forms'
import { MdcDialog, Overlay } from '@angular-mdc/web'
import { Observable, of } from 'rxjs'
import {
  selectLookupPoliciesState,
  selectLookupSubpoliciesState,
  selectLookupCommitmentsState,
  selectLookupClassificationsState,
  selectLookupDLMsState
} from '../../../reducers/lookups/lookup.reducer'

import {
  selectAppConfigState,
  Config
} from '../../../../../../../libs/df-app-core/src'
import * as fromBrief from '../../../reducers/brief/brief.reducer'
import * as fromLookup from '../../../reducers/lookups/lookup.reducer'

describe('BriefDataEditorComponent', () => {
  let component: BriefDataEditorComponent
  let fixture: ComponentFixture<BriefDataEditorComponent>
  let mockStore: MockStore<any>
  let actions$: Observable<any>
  let config: Config
  let policies$: Observable<
    {
      caption: string
      value: string
    }[]
  >

  let subpolicies$: Observable<
    {
      caption: string
      value: string
    }[]
  >

  let commitment$: Observable<
    {
      caption: string
      value: string
    }[]
  >

  let classifications$: Observable<
    {
      caption: string
      value: string
    }[]
  >

  let dlms$: Observable<
    {
      caption: string
      value: string
    }[]
  >

  const initialState: fromBrief.State =  fromBrief.initialState

  const lookupState: fromLookup.State = fromLookup.initialState

  const appState = {
    config
  }

  beforeEach(async(() => {
    const configure = (testBed: TestBed) => {
      testBed.configureTestingModule({
        schemas: [NO_ERRORS_SCHEMA],
        declarations: [BriefDataEditorComponent],
        providers: [
          MdcDialog,
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
        ]
      })
    }
    configureTests(configure).then(testBed => {
      fixture = testBed.createComponent(BriefDataEditorComponent)
      component = fixture.componentInstance
      mockStore = testBed.get(Store)
      initialState.brief = getBrief()
      mockStore.overrideSelector(fromBrief.selectBriefState, initialState.brief)
      lookupState.policies = getPolicies()
      mockStore.overrideSelector(
        selectLookupPoliciesState,
        lookupState.policies
      )
      lookupState.subpolicies = getSubPolicies()
      mockStore.overrideSelector(
        selectLookupSubpoliciesState,
        lookupState.subpolicies
      )
      lookupState.commitments = getCommitments()
      mockStore.overrideSelector(
        selectLookupCommitmentsState,
        lookupState.commitments
      )
      lookupState.classifications = getClassifications()
      mockStore.overrideSelector(
        selectLookupClassificationsState,
        lookupState.classifications
      )
      lookupState.dlms = getProtectiveMarkings()
      mockStore.overrideSelector(selectLookupDLMsState, lookupState.dlms)
      appState.config = getConfig()
      mockStore.overrideSelector(selectAppConfigState, appState.config)

      component.form.patchValue(getPatch())

      fixture.detectChanges()
    })
  }))

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should get the Brief', () => {
    mockStore.select(fromBrief.selectBriefState).subscribe(result => {
      expect(result.fileLeafRef).toEqual(
        '0733738d-5946-ca15-7797-eb31615111f2.docx'
      )
    })
  })

  it('should get Policies', () => {
    mockStore.select(selectLookupPoliciesState).subscribe(result => {
      expect(result[0].Title).toEqual('Sample Policy Two')
    })
  })

  it('should get Subpolicies', () => {
    mockStore.select(selectLookupSubpoliciesState).subscribe(result => {
      expect(result[0].Title).toEqual('SubPolicy Four')
      expect(result[0].Policy.Title).toEqual('Sample Policy Two')
    })
  })

  it('should get Commitments', () => {
    mockStore.select(selectLookupCommitmentsState).subscribe(result => {
      expect(result[0].Title).toEqual('Bibimbap Dave aasfas')
    })
  })

  it('should get Classifications', () => {
    mockStore.select(selectLookupClassificationsState).subscribe(result => {
      expect(result[0].caption).toEqual('UNCLASSIFIED')
    })
  })

  it('should get Classifications', () => {
    mockStore.select(selectLookupDLMsState).subscribe(result => {
      expect(result[0].caption).toEqual(
        'Not for tabling - For Official Use Only'
      )
    })
  })
})

function getPatch() {
  let brief = getBrief()
  const patch = {
    title: brief.title,
    securityClassification: brief.securityClassification,
    sortOrder: brief.order,
    dLM: brief.dLM,
    policy: brief.policy ? brief.policy.id : null,
    subpolicy: brief.subPolicy ? brief.subPolicy.id : null,
    recommendedDirection: brief.recommendedDirection
  }
  return patch
}

function getBrief() {
  let brief = {
    briefDivision: { id: 1, title: undefined },
    briefStatus: { id: 1, title: undefined },
    dLM: null,
    dueDate: null,
    editor: { id: null, title: null },
    fileLeafRef: '0733738d-5946-ca15-7797-eb31615111f2.docx',
    id: 1,
    modified: undefined,
    order: 999,
    policy: { id: 1, title: 'Sample Policy' },
    policyDirection: undefined,
    reference: 'BRIEF-19-000001',
    securityClassification: 'UNCLASSIFIED',
    subPolicy: { id: 1, title: 'SubPolicy One' },
    title: 'Sample Policy Brief 1',
    recommendedDirection: 'Agreed',
    recommendations: [getRecommendation()]
  }
  return brief
}

function getPolicies() {
  const policies = [
    {
      Id: 2,
      Title: 'Sample Policy Two',
      SortOrder: 99,
      ID: 2,
      Colour: 'Green'
    },
    {
      Id: 1,
      Title: 'Sample Policy',
      SortOrder: 999,
      ID: 1,
      Colour: 'Crimson'
    }
  ]
  return policies
}

function getSubPolicies() {
  const subpolicies = [
    {
      Id: 4,
      Title: 'SubPolicy Four',
      SortOrder: 9,
      ID: 4,
      Colour: 'Silver',
      Policy: {
        Id: 2,
        Title: 'Sample Policy Two',
        Colour: 'Green',
        SortOrder: 99
      }
    },
    {
      Policy: {
        Id: 1,
        Title: 'Sample Policy',
        Colour: 'Crimson',
        SortOrder: 999
      },
      Id: 3,
      Title: 'SubPolicy Three',
      SortOrder: 50,
      Colour: 'Green',
      ID: 3
    },
    {
      Policy: {
        Id: 1,
        Title: 'Sample Policy',
        Colour: 'Crimson',
        SortOrder: 999
      },
      Id: 1,
      Title: 'SubPolicy One',
      SortOrder: 999,
      Colour: 'Crimson',
      ID: 1
    }
  ]
  return subpolicies
}

function getCommitments() {
  const commitments = [
    {
      ContentTypeId: { $p_1: '0x0100594FDB57D7D28E498BE716295885C98D' },
      Title: 'Bibimbap Dave aasfas',
      _ModerationComments: null,
      File_x0020_Type: null,
      Description:
        '<div>beef ribs short ribs ball tip. Pork chop leberkas cupim shoulder carstrsathicken ground round pork loin, pancetta cow.Tail t-bone shoulder tri-tip landjaeger shankle beef ribs rump. Turducken bresaola picanha filet mignon flank jowl. Biltong cow boudin hamburger corned beef chuck buffalo kevin. Ham drumstick biltong, strip steak kielbasa beef andouille tri-tip short loin burgdoggen chicken meatball beef ribs. Flank prosciutto salami, chuck pig andouille short loin cow t-bone biltong tongue jowl corned beef venison. Turducken shank kielbasa, ball tip tenderloin corned beef pastrami porchetta biltong tail kevin.​​ asdfsadf asdfBacon ipsum dolor amet tail filet mignon kielbasa shank beef cupim chicken rump bacon venison jowl turducken. Turducken ground round beef tri-tip salami picanha ham hock jowl kevin fatback prosciutto. Chuck sausage ground round pork belly rump. Ham hock pork loin as pork ast chop capicola astasrt. Ground round ribeye salami swine landjaegerasstast corned beef fatback  astarst tongue. Picanha brisket hamburger,&nbsp; asastasatkk<br></div><div>biltong doner filet mignon bresaola landjaeger ham shankle.Capicola alcatra drumstick tail. Jerky rump ham hock salami frankfurter. Tongue biltong ham hock chuck sirloin hamburger turkey salami t-bone pig kevin porchetta. Spare ribs kielbasa bresaola tri-tip, hamburger buffalo pancetta drumstick t-bone. Biltong doner prosciutto ground round shank burgdoggen pork jerky. Fatback turducken pork short ribs tail chicken.</div><div><br></div><div>Ham hock flank pork loin, rump andouille corned beef chuck spare ribs biltong<i> brisket ribeye t</i>ail porchetta short loin meatball. Biltong shank tri-tip cow alcatra jerky swine brisket. Ball tip drumstick pork loin pork belly turducken t-bone rump pancetta ham cow shankle tail frankfurter meatloaf alcatra. Sirloin tail ribeye, venison ball tip cow doner spare ribs pastrami beef. Doner chuck tri-tip, capicola bacon tail pork loin fatback.Jowl turkey <b>andouille arst </b>short ribs. Capicola tongue kevin cow venison, flank andouille t-bone pork belly landjaeger tail buffalo pancetta shankle filet mignon. Meatball andouille kielbasa,&nbsp;</div><div>Test&nbsp; asdfsadf astast</div><div><br></div><div>again.</div><div><ul><li>porchetta&nbsp;<br></li><li>leberkas&nbsp;<br></li><li>boudinbvvb arstastast<br></li></ul><div>again.</div></div><div><br></div><div>again</div><div><br></div><div>again.</div><div><br></div><div>beef ribs short ribs ball tip. Pork chop leberkas cupim shoulder carstrsathicken ground round pork loin, pancetta cow.Tail t-bone shoulder tri-tip landjaeger shankle beef ribs rump. Turducken bresaola picanha filet mignon flank jowl. Biltong cow boudin hamburger corned beef chuck buffalo kevin. Ham drumstick biltong, strip steak kielbasa beef andouille tri-tip short loin burgdoggen chicken meatball beef ribs. Flank prosciutto salami, chuck pig andouille short loin cow t-bone biltong tongue jowl corned beef venison. Turducken shank kielbasa, ball tip tenderloin corned beef pastrami porchetta biltong tail kevin.​​ asdfsadf asdf<br></div><div><br></div><div>&nbsp;beef ribs short ribs ball tip. Pork chop leberkas cupim shoulder carstrsathicken ground round pork loin, pancetta cow.Tail t-bone shoulder tri-tip landjaeger shankle beef ribs rump. Turducken bresaola picanha filet mignon flank jowl. Biltong cow boudin hamburger corned beef chuck buffalo kevin. Ham drumstick biltong, strip steak kielbasa beef andouille tri-tip short loin burgdoggen chicken meatball beef ribs. Flank prosciutto salami, chuck pig andouille short loin cow t-bone biltong tongue jowl corned beef venison. Turducken shank kielbasa, ball tip tenderloin corned beef pastrami porchetta biltong tail kevin.​​ asdfsadf asdf</div><div><br></div><div>This is anoth</div>',
      Cost: '12',
      Date: '2018-10-11T13:00:00.000Z',
      AnnouncedBy: 'Kevin Bacon',
      Contacts: null,
      Guid0: 22234,
      PoliticalParty: { $1T_1: 1, $4K_1: 'Liberal Party of Australia' },
      Location: null,
      Portfolio: { $1T_1: 34, $4K_1: "Attorney-General's" },
      AnnouncementType: null,
      WhoAnnouncedType: { $1T_1: 3, $4K_1: 'Relevant Spokesperson' },
      CommitmentType: { $1T_1: 3, $4K_1: 'Electorate' },
      CriticalDate: { $1T_1: 2, $4K_1: '2' },
      ThemeType: null,
      PackageType: null,
      OfficialCosting: false,
      CostingRequired: true,
      Status: { $1T_1: 2, $4K_1: 'With Policy Area' },
      ID: 1,
      Modified: '2019-05-07T22:35:07.000Z',
      Created: '2018-10-09T03:04:26.000Z',
      Author: {
        $1T_1: 9,
        $4K_1: 'Peter Giles',
        $6_2: 'peter.giles@pmc.gov.au'
      },
      Editor: {
        $1T_1: 13,
        $4K_1: 'Kim mcclymont',
        $6_2: 'kim.mcclymont@pmc.gov.au'
      },
      _HasCopyDestinations: null,
      _CopySource: null,
      owshiddenversion: 280,
      WorkflowVersion: 1,
      _UIVersion: 59904,
      _UIVersionString: '117.0',
      Attachments: false,
      _ModerationStatus: 0,
      InstanceID: null,
      Order: 100,
      GUID: { _m_guidString$p$0: '4aa73cfb-9c9d-4026-8b0c-c3011fb077a8' },
      WorkflowInstanceID: null,
      FileRef: '/sites/commitments/Lists/Commitment/1_.000',
      FileDirRef: '/sites/commitments/Lists/Commitment',
      Last_x0020_Modified: '2018-10-09T03:04:26Z',
      Created_x0020_Date: '2018-10-09T03:04:26Z',
      FSObjType: '0',
      SortBehavior: { $1T_1: 1, $4K_1: '0' },
      FileLeafRef: '1_.000',
      UniqueId: { _m_guidString$p$0: '090fda7b-51a1-4661-b497-36c4769d7ca1' },
      SyncClientId: { $1T_1: 1, $4K_1: null },
      ProgId: '',
      ScopeId: '{EDF610F0-F164-4B20-8097-68D713A2F430}',
      MetaInfo: '',
      _Level: 1,
      _IsCurrentVersion: true,
      ItemChildCount: '0',
      FolderChildCount: '0',
      Restricted: '',
      ContentVersion: '0',
      AppAuthor: null,
      AppEditor: null
    }
  ]
  return commitments
}

function getClassifications() {
  const classifications = [
    {
      caption: 'UNCLASSIFIED',
      value: 'UNCLASSIFIED'
    },
    {
      caption: 'IN CONFIDENCE',
      value: 'IN CONFIDENCE'
    },
    {
      caption: 'PROTECTED',
      value: 'PROTECTED'
    }
  ]
  return classifications
}

function getProtectiveMarkings() {
  const dlms = [
    {
      caption: 'Not for tabling - For Official Use Only',
      value: 'Not for tabling - For Official Use Only'
    },
    {
      caption: 'For Official Use Only',
      value: 'For Official Use Only'
    },
    {
      caption: 'Sensitive',
      value: 'Sensitive'
    },
    {
      caption: 'Sensitive Cabinet',
      value: 'Sensitive Cabinet'
    },
    {
      caption: 'Sensitive Legal',
      value: 'Sensitive Legal'
    },
    {
      caption: 'Sensitive Personal',
      value: 'Sensitive Personal'
    }
  ]
  return dlms
}

function getConfig() {
  const defaults: Config = {
    webId: null,
    siteId: null,
    header: {
      title: 'Unconfigured Application',
      backgroundColour: '#455a64',
      classification: 'UNCLASSIFIED',
      logo: {
        image: 'assets/crest.png',
        url: '/'
      },
      apps: []
    }
  }
  return defaults
}

function getRecommendation() {
  const recommendation = {
    ID: 1,
    Title: 'Test recommendation',
    Recommendation: 'This is a recomendation',
    Outcome1: 'Agree',
    Outcome2: null,
    Outcome3: null,
    Colour: 'rgb(84, 70, 126)',
    SortOrder: '1',
    Policy: null,
    SubPolicy: null
    //Brief: getBrief()
  }
  return recommendation
}
