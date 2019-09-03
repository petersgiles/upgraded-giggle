import 'core-js/es7/reflect'
import 'zone.js/dist/zone'
import 'zone.js/dist/proxy';
import 'zone.js/dist/async-test';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';
import 'jest-zone-patch' 
 
import { async, TestBed, inject} from '@angular/core/testing'
import { ConfigureFn, configureTests } from '../../../../../../libs/df-testing'
import { Lookup } from '../../models'
import { LookupMapperService } from './lookup-mapper.service';
import { CoreMapperService } from '../../services/mappers/core-mapper.service'
import * as data from '../../../../../../devdata/data'


describe('LookupMapperService', () => {
  let service: LookupMapperService

  beforeEach(async(() => { 
    const configure = (testBed: TestBed) => {
        testBed.configureTestingModule({
          imports: [],
     providers:
          [ 
            {provide: CoreMapperService,
            useClass: LookupMapperService
            },
           
          ],
        })
      }
       configureTests(configure).then(testBed => {
        service = testBed.get(LookupMapperService)
       
      })
  }))

  it('should be created', () => {
    expect(service).toBeTruthy();
  })

  it('should get brief from Lookup', inject([CoreMapperService],(service: CoreMapperService<Lookup>) => { //
    const brief: Lookup = service.mapSingle(
        {
          ID: getBrief().ID,
          Title: getBrief().Title,
          SortOrder: getBrief().SortOrder,
          Icon: null
        }
  )
    expect(brief.id).toBe(getBrief().ID)
    expect(brief.value).toBe(getBrief().ID)
    expect(brief.order).toBe(getBrief().SortOrder)
    expect(brief.caption).toBe(getBrief().Title)
  }))

  it('should get policy from Lookup', inject([CoreMapperService],(service: CoreMapperService<Lookup>) => { //
    const policy: Lookup = service.mapSingle(
        {
          ID: getPolicies()[0].ID,
          Title: getPolicies()[0].Title,
          SortOrder: getPolicies()[0].SortOrder,
          Icon: null
        }
  )
    expect(policy.id).toBe(getPolicies()[0].ID)
    expect(policy.caption).toBe(getPolicies()[0].Title)
    expect(policy.order).toBe(getPolicies()[0].SortOrder)
  }))

  it('should get subpolicy from Lookup', inject([CoreMapperService],(service: CoreMapperService<Lookup>) => { //
    const subpolicy: Lookup = service.mapSingle(
        {
          ID: getSubPolicies()[0].ID,
          Title: getSubPolicies()[0].Title,
          SortOrder: getSubPolicies()[0].SortOrder,
          Icon: null
        }
  )
    expect(subpolicy.id).toBe(getSubPolicies()[0].ID)
    expect(subpolicy.caption).toBe(getSubPolicies()[0].Title)
    expect(subpolicy.order).toBe(getSubPolicies()[0].SortOrder)
  }))

  it('should get commitment from Lookup', inject([CoreMapperService],(service: CoreMapperService<Lookup>) => { //
    const commitment: Lookup = service.mapSingle(
        {
          ID: getCommitments()[0].ID,
          Title: getCommitments()[0].Title,
          SortOrder: null,
          Icon: null
        }
  )
    expect(commitment.id).toBe(getCommitments()[0].ID)
    expect(commitment.caption).toBe(getCommitments()[0].Title)
  }))

  it('should get comment from Lookup', inject([CoreMapperService],(service: CoreMapperService<Lookup>) => { //
    const comment: Lookup = service.mapSingle(
        {
          ID: getComment().ID,
          Title: getComment().Title,
          SortOrder: getComment().SortOrder,
          Icon: null
        }
  )
    expect(comment.id).toBe(getComment().ID)
    expect(comment.caption).toBe(getComment().Title)
    expect(comment.order).toBe(getComment().SortOrder)
  }))

})

function getBrief(){
  let brief = {Id: 6,
    Title: 'The Determinism Of Free-Floating Disposition',
    SortOrder: null,
    ID: 6,
    Policy: {
      Id: 1,
      Title: 'Sample Policy',
      Colour: 'Crimson',
      SortOrder: 999
    },
    SubPolicy: {
      Id: 1,
      Title: 'SubPolicy One',
      Colour: 'Crimson',
      SortOrder: 999
    },
    BriefStatus: {
      Id: 2
    },
    FileLeafRef: 'LOCALDEV-DAVE-636904932061394635.docx',
    Reference: 'BN:636904932061524864',
    Notify: null,
    SecurityClassification: 'UNCLASSIFIED',
    DueDate: null,
    DLM: 'For Official Use Only'
  }
  return brief
 }

 function getPolicies(){
  const policies = [
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

function getSubPolicies(){
  const subpolicies = [
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
    
  ]
 return subpolicies  
}

function getCommitments(){
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
      Author: { $1T_1: 9, $4K_1: 'Peter Giles', $6_2: 'peter.giles@pmc.gov.au' },
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
    }]
    return commitments
  }

  function getComment(){
    const comment = {
        ID: 1,
        Title: 'Test Title',
        Comments: 'Main comment',
        Parent: null,
        Channel: 'Agency',
        Created: '2019-03-13T13:00:00.000Z',
        SortOrder: 1,
        Brief: data.briefs[0]
    }
    return comment
  }
