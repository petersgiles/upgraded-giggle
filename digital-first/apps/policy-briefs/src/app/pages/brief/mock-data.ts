import { toTree } from '@df/utils'

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
