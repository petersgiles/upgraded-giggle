import { toTree } from '@df/utils'
import { DocumentStatus, NavigatorTreeNode } from '@df/components'

export const navigatorData: NavigatorTreeNode[] = [
  {
    id: 'ddf2e782-c890-5df3-8169-d94c099e60c1',
    parent: null,
    caption: 'qui in est',
    meta: 'last updated 1/1/2019',
    colour: 'GoldenRod',
    order: 17,
    active: false,
    expanded: false
  },
  {
    id: 'd28dd1d7-7a03-53e2-8620-7cc9801fb091',
    parent: 'ddf2e782-c890-5df3-8169-d94c099e60c1',
    caption: 'fugit sint officia',
    meta: '3 new',
    colour: 'GoldenRod',
    order: 65,
    active: false,
    expanded: false
  },
  {
    id: '6e163c94-eca8-54bf-9857-95988c2742c6',
    parent: 'ddf2e782-c890-5df3-8169-d94c099e60c1',
    caption: 'exercitationem illum voluptas',
    meta: '',
    colour: 'GoldenRod',
    order: 54,
    active: false,
    expanded: false
  },
  {
    id: 'b47463dc-63b7-5feb-b006-8558b6e67a72',
    parent: 'd28dd1d7-7a03-53e2-8620-7cc9801fb091',
    caption: 'aut eveniet voluptatem',
    meta: 'last updated 1/1/2019',
    colour: 'GoldenRod',
    order: 41,
    active: false,
    expanded: false
  },
  {
    id: 'b99c94cc-4c87-51c2-ad8b-71966991116b',
    parent: '6e163c94-eca8-54bf-9857-95988c2742c6',
    caption: 'quisquam natus enim',
    meta: 'last updated 1/1/2019',
    colour: 'GoldenRod',
    order: 4,
    active: false,
    expanded: false
  },
  {
    id: '329ce8ed-5e8c-52aa-984a-e3615463d392',
    parent: null,
    caption: 'quo iure similique',
    meta: 'last updated 1/1/2019',
    colour: 'Crimson',
    order: 43,
    active: false,
    expanded: true
  },
  {
    id: '6b7563f1-8e30-5d96-8495-9d99c3cf3fab',
    parent: 'fec1cadd-0fff-599c-b1a4-49b7349a4d57',
    caption: 'eos omnis nesciunt',
    meta: 'last updated 1/1/2019',
    colour: 'Crimson',
    order: 99,
    active: true,
    expanded: false
  },
  {
    id: 'e6976877-f03d-5a39-a8d0-3baee5365476',
    parent: '329ce8ed-5e8c-52aa-984a-e3615463d392',
    caption: 'quibusdam excepturi pariatur',
    meta: 'last updated 1/1/2019',
    colour: 'Crimson',
    order: 1,
    active: false,
    expanded: false
  },
  {
    id: 'fec1cadd-0fff-599c-b1a4-49b7349a4d57',
    parent: 'e6976877-f03d-5a39-a8d0-3baee5365476',
    caption: 'quia sunt facilis',
    meta: 'last updated 1/1/2019',
    colour: 'Crimson',
    order: 39,
    active: false,
    expanded: false
  },
  {
    id: 'fec1cadd-0fff-599c-b1a4-49b7349a4d51',
    parent: 'fec1cadd-0fff-599c-b1a4-49b7349a4d57',
    caption: '4 deep',
    meta: 'last updated 1/1/2019',
    colour: 'Crimson',
    order: 39,
    active: false,
    expanded: false
  },
  {
    id: 'e9861dad-d68e-5aa6-9ee9-96eb46534a4a',
    parent: 'fec1cadd-0fff-599c-b1a4-49b7349a4d57',
    caption: 'ipsam facilis totam',
    meta: 'last updated 1/1/2019',
    colour: 'Crimson',
    order: 10,
    active: false,
    expanded: false
  }
]
export const statuslist: DocumentStatus[] = [
  {
    id: '1',
    icon: 'people',
    caption: 'In Draft',
    colour: 'Pink',
    order: 1
  },
  {
    id: '2',
    icon: 'how_to_reg',
    caption: 'Ready',
    colour: 'GhostWhite',
    order: 2
  },
  {
    id: '3',
    icon: 'cancel_presentation',
    caption: 'Cancelled',
    colour: 'Crimson',
    order: 3
  }
]

export const demoAuthor: any = {
  username: 'demoAuthor',
  name: 'Demo Author',
  email: 'DemoAuthor@yahoo.com',
  phone: '555 555 555 555',
  color: 'rgb(200, 70, 70)'
}

export const discussionItems: any = {
  timeFormat: 'dateFormat',
  activeComment: null,
  comments: [
    {
      id: 'c8bfffbcd25241e09272079538d089c1',
      commitment: 20,
      text: `Turnip greens yarrow ricebean rutabaga endive cauliflower sea lettuce kohlrabi
        amaranth water spinach avocado daikon napa cabbage asparagus winter purslane kale.
        Celery potato scallion desert raisin horseradish spinach carrot soko. Lotus root water
         spinach fennel kombu maize bamboo shoot green bean swiss chard seakale pumpkin onion chickpea
         gram corn pea. Brussels sprout coriander water chestnut gourd swiss chard wakame kohlrabi beetroot carrot watercress.
        Corn amaranth salsify bunya nuts nori azuki bean chickweed potato bell pepper artichoke.`,
      created: '2018-11-28T20:36:06.878Z',
      parent: null,
      author: {
        username: 'Domenica20',
        name: 'Alysson Kunde',
        email: 'Carroll_Bradtke33@yahoo.com',
        phone: '077.179.3639 x402',
        color: 'rgb(84, 70, 126)'
      }
    },
    {
      id: '549e2c69631e4e40a623266b87a95de3',
      commitment: 20,
      text: `Nori grape silver beet broccoli kombu beet greens fava bean potato quandong celery.
        Bunya nuts black-eyed pea prairie turnip leek lentil turnip greens parsnip. Sea lettuce lettuce water chestnut
        eggplant winter purslane fennel azuki bean earthnut pea sierra leone bologi leek soko chicory celtuce parsley jícama salsify.`,
      created: '2018-11-28T21:00:32.815Z',
      parent: 'c8bfffbcd25241e09272079538d089c1',
      author: {
        username: 'personfreak',
        name: 'John Person',
        email: 'JohnPerson@yahoo.com',
        phone: '077.179.3639 x402',
        color: 'tomato'
      }
    },
    {
      id: 'a230a600cab6480b9bcc2ed54d7c4751',
      commitment: 20,
      text: `Beetroot water spinach okra water chestnut
        ricebean pea catsear courgette summer purslane.
        Water spinach arugula pea tatsoi aubergine spring onion bush tomato kale radicchio
        turnip chicory salsify pea sprouts fava bean. Dandelion zucchini burdock yarrow chickpea
        dandelion sorrel courgette turnip greens tigernut soybean radish artichoke wattle seed endive groundnut broccoli arugula.',
        created: '2018-11-28T21:55:41.909Z`,
      parent: null,
      author: {
        username: 'Domenica20',
        name: 'Alysson Kunde',
        email: 'Carroll_Bradtke33@yahoo.com',
        phone: '077.179.3639 x402',
        color: 'rgb(84, 70, 126)'
      }
    },
    {
      id: 'afb99e51d1a74187bc9bc9bb7f903e56',
      commitment: 20,
      text: `Soko radicchio bunya nuts gram dulse silver beet parsnip napa cabbage lotus root sea
        lettuce brussels sprout cabbage. Catsear cauliflower garbanzo yarrow salsify chicory
         garlic bell pepper napa cabbage lettuce tomato kale arugula melon sierra leone bologi
          rutabaga tigernut. Sea lettuce gumbo grape kale kombu cauliflower salsify
           kohlrabi okra sea lettuce broccoli celery lotus root carrot winter
            purslane turnip greens garlic. Jícama garlic courgette coriander
             radicchio plantain scallion cauliflower fava bean desert raisin
              spring onion chicory bunya nuts. Sea lettuce water spinach gram
               fava bean leek dandelion silver beet eggplant bush tomato.`,
      created: '2018-12-02T21:24:18.932Z',
      parent: null,
      author: {
        username: 'Carroll_Bradtke',
        name: 'Carroll Bradtke',
        email: 'Carroll_Bradtke33@yahoo.com',
        phone: '077.179.3639 x402',
        color: '#333333'
      }
    }
  ],
  loading: false
}

export const discussionTree = toTree(discussionItems.comments, {
  id: 'id',
  parentId: 'parent',
  children: 'children',
  level: 'level',
  firstParentId: null
})

export const baconIpsum = `
<div class="anyipsum-output">
<p>Bacon ipsum dolor amet pork belly landjaeger fatback, frankfurter biltong cow leberkas.
Ball tip bacon fatback pancetta ribeye filet mignon, jerky meatloaf.
Cow ham hock boudin strip steak picanha t-bone.
Salami buffalo spare ribs, drumstick short loin beef bacon pork turkey short ribs brisket rump sausage pork belly.
Biltong tail frankfurter meatball strip steak beef ribs ham pork chop ground round.
Leberkas strip steak turducken shoulder landjaeger jerky.</p><p>Frankfurter venison porchetta,
alcatra shank tongue bacon pancetta pork chop filet mignon.
Ham hock pork sausage, porchetta andouille meatball beef ribs shank burgdoggen meatloaf ham ribeye tongue shoulder.
Shoulder chicken kielbasa pork loin, venison rump t-bone burgdoggen frankfurter tongue.
Beef ribs kielbasa pork loin short ribs porchetta ground round tongue drumstick.
</p>
<p>Filet mignon pork belly landjaeger, frankfurter fatback buffalo jerky drumstick salami corned beef kevin pork loin short ribs.
 Frankfurter flank strip steak ham pastrami ground round leberkas meatloaf sirloin cow prosciutto filet mignon sausage chuck.
 Ham hock frankfurter capicola, landjaeger pork chop shank beef.  Strip steak capicola picanha alcatra kielbasa short ribs shankle
turkey pastrami turducken ground round.</p><p>Venison cupim pork belly, ball tip chicken pork chop shank jowl capicola brisket
prosciutto shoulder.  Picanha sirloin alcatra fatback turkey beef cow frankfurter tenderloin salami.
Capicola buffalo cupim pancetta.  Pork cow alcatra strip steak.
Chuck ground round ham venison filet mignon ribeye.</p><p>Shankle jowl pancetta andouille swine corned beef.
Hamburger boudin ham hock turducken spare ribs rump filet mignon cupim leberkas pig.
Tenderloin t-bone shankle, bresaola filet mignon pork belly spare ribs swine biltong beef ribs short loin.
Buffalo short loin venison tongue short ribs bacon chuck pork chop kielbasa hamburger sausage shoulder.
</p>
</div>
`
