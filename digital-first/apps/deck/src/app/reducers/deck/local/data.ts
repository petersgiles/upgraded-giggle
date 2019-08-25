
import { CardType } from '../../../components/deck/models/card-type-enum'
const pieChart = {
  chartData: [
    {
      data: [10, 20, 30]
    }
  ],
  chartLabels: ['Red', 'Yellow', 'Blue'],
  chartOptions: {
    responsive: true
  },
  chartLegend: true,
  chartType: 'pie'
}

const lineChart = {
  chartData: [
    { data: [65, 90, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 90, 19, 86, 27, 90], label: 'Series B' },
    { data: [18, 48, 77, 9, 100, 90, 40], label: 'Series C' }
  ],
  chartLabels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  chartOptions: {
    responsive: true
  },
  chartLegend: true,
  chartType: 'line',
  chartColors: [
    {
      // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    {
      // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    {
      // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ]
}

export const deckData = {
  data: [
    {
      id: '7',
      title: 'SummaryLinksNoActions',
      parent: null,
      supportingText:
        '<div class="ExternalClass1BE6E611C33B49F9AA2854A5C3923A49"><p> in data list of urls<br><br></p></div>',
      size: '4',
      cardType: CardType.SummaryLinksNoActions,
      actions: [
        {
          title: 'DECK',
          url:
            'http://vm-dev-lbs13/sites/lbsMk1-pete/SitePages/admin.aspx/admin'
        }
      ],
      sortOrder: '1',
      colour: 'Orange',
      titleClass: 'Orange',
      media: null,
      data: [
        {
          url: 'https://lbs.cloud9.cabnet/SitePages/index.aspx/brief/4199',
          title: 'The Legitimisation Of Epistemological Vivacity'
        },
        {
          openInNewTab: true,
          url: 'https://lbs.cloud9.cabnet/SitePages/index.aspx/brief/4199',
          title: 'The Affectability Of Inevitable Reciprocity second'
        }
      ]
    },
    {
      id: '1',
      title: 'Topics',
      parent: null,
      supportingText: `<div class="ExternalClass188C1E716DA94A9CB7C149344480A7C3">
        <div class="deckitem-briefsummary">
        <table class="mdl-data-table"><thead><tr>
        <th class="mdl-data-table__cell--non-numeric"> Brief Title </th><th> Decisions </th>
        <th> Commitments </th>
        </tr></thead><tbody><tr class="clickable-row" data-href="/SitePages/index.aspx/brief/4334"><td class="mdl-data-table__cell--non-numeric">
        <a href="/SitePages/index.aspx/brief/4334">The Affectability Of Inevitable Reciprocity</a> </td><td> 1/2 </td><td> 2 </td>
        </tr><tr class="clickable-row" data-href="/SitePages/index.aspx/brief/228"><td class="mdl-data-table__cell--non-numeric">
        <a href="/SitePages/index.aspx/brief/228">The Legitimisation Of Epistemological Vivacity</a> </td><td> 0/1 </td><td> 4 </td>
        </tr>
        <tr class="clickable-row" data-href="/SitePages/index.aspx/brief/4260"><td class="mdl-data-table__cell--non-numeric">
         <a href="/SitePages/index.aspx/brief/4260">The Theme Of Harmonizing Attitude</a>
         </td><td> 0/3 </td><td> - </td></tr></tbody><tfoot><tr><td colspan="3">
          <a href="/SitePages/commitments-reader.aspx/overview?refiner=%5b%7b%22group%22%3a%22deckItemBriefSummaries%22%2c%22id%22%3a%22089cbb1b-c2ef-4851-9571-9235b8d7efc2%22%7d%5d">6 Commitments</a>
        </td>
        </tr></tfoot></table></div></div> <br>`,
      size: '4',
      cardType: CardType.BriefSummary,
      actions: [{ title: 'CHEESE', url: '/' }],
      sortOrder: '9',
      colour: 'DarkMagenta',
      titleClass: 'DarkMagenta',
      media: null,
      data: [
        {
          id: '5e1ce060-1e74-48a7-9847-f4698c23c0b4',
          name: 'Brief Summary For Redbook'
        },
        {
          id: '30f81c55-2ad5-4874-b396-d70e4d97b2ee',
          name: 'Brief Summary For Redbook 2'
        }
      ]
    },
    {
      id: '2',
      title: 'Test',
      parent: null,
      supportingText:
        '<div class="ExternalClassEC844ABB266C4CF7857F776E0B745CCF"><p>test </p></div>',
      size: '4',
      cardType: CardType.Parent,
      actions: [{ title: 'Get Started', url: '/dashboard' }],
      sortOrder: '9',
      colour: 'IGBGreen',
      titleClass: 'IGBGreen',
      media: null,
      data: false
    },
    {
      id: '3',
      title: 'Image',
      parent: null,
      supportingText: null,
      size: '4',
      cardType: CardType.Image,
      actions: [{ title: 'Get Started', url: '/dashboard' }],
      sortOrder: '9',
      colour: 'Crimson',
      titleClass: 'Crimson',
      media: { url: 'https://picsum.photos/1200/400/?random' },
      data: false
    },
    {
      id: '4',
      title: 'child',
      parent: '2',
      supportingText:
        '<div class="ExternalClass0398B1E1192E4A64B251972EA56E326B"><p> some child text<br></p></div>',
      size: '4',
      cardType: CardType.Standard,
      actions: [{ title: 'Get Started', url: '/dashboard' }],
      sortOrder: '9',
      colour: 'Orange',
      titleClass: 'Orange',
      media: null,
      data: false
    },
    {
      id: '5',
      title: 'StandardNonNavNoActions',
      parent: null,
      supportingText:
        '<div class="ExternalClass1AC7337E369A46CD9F25EE7A148517A4"><p><span>a standard card where supporting text doesn\'t nav but action are not&#160;shown</span> <br></p></div>',
      size: '4',
      cardType: CardType.StandardNonNavNoActions,
      actions: [{ title: 'Get Started', url: '/dashboard' }],
      sortOrder: '9',
      colour: 'Crimson',
      titleClass: 'Crimson',
      media: null,
      data: false
    },
    {
      id: '6',
      title: 'StandardNonNav',
      parent: null,
      supportingText:
        '<div class="ExternalClassC5F70AEB09774840A1D7ACBD73021260"><p> a standard card where supporting text doesn\'t nav but action are shown<br></p></div>',
      size: '4',
      cardType: CardType.StandardNonNav,
      actions: [{ title: 'Get Started', url: '/dashboard' }],
      sortOrder: '9',
      colour: 'Crimson',
      titleClass: 'Crimson',
      media: null,
      data: false
    },
    {
      id: '8',
      title: 'Bacon Ipsum',
      parent: null,
      supportingText: `<div class="ExternalClassB0457B6866AE4EDDAB10D60B930EC856">
        <span style="color:rgb(51, 51, 51);font-family:Georgia, &quot;Bitstream Charter&quot;, serif;">
        Bacon ipsum <b>dolor </b>amet ham hock salami burgdoggen flank turkey jerky pork chop biltong,
        ribeye pig jowl ham t-bone pancetta. Strip steak t-bone sirloin turducken pork belly, ham shoulder pastrami
        pork spare ribs swine ball tip. Salami ham pork belly venison pastrami prosciutto
        biltong drumstick kielbasa strip steak. Drumstick turducken shoulder, alcatra swine burgdoggen doner.</span></div>`,
      size: '4',
      cardType: CardType.Standard,
      actions: [{ url: '' }],
      sortOrder: '999',
      colour: 'LightCoral',
      titleClass: 'LightCoral',
      media: null,
      data: false
    },
    {
      id: '9',
      parent: null,
      title: 'Chart Cards',
      supportingText: `<div><img src="https://www.chartjs.org/img/chartjs-logo.svg"></div>`,
      size: '4',
      cardType: CardType.Parent,
      actions: [{ url: 'https://www.chartjs.org', title: 'Go' }],
      sortOrder: '1',
      colour: 'Crimson',
      titleClass: 'Crimson',
      media: null,
      data: null
    },
    {
      id: '10',
      parent: '9',
      title: 'Line Chart',
      supportingText: 'cheese',
      size: '4',
      cardType: CardType.Chart,
      actions: [],
      sortOrder: '1',
      colour: 'Yellow',
      titleClass: 'Yellow',
      media: null,
      data: lineChart
    },
    {
      id: '11',
      parent: '9',
      title: 'Pie Chart',
      supportingText: null,
      size: '4',
      cardType: CardType.Chart,
      actions: [],
      sortOrder: '1',
      colour: 'CornflowerBlue',
      titleClass: 'CornflowerBlue',
      media: null,
      data: pieChart
    },
    {
      id: '12',
      parent: null,
      title: 'Pictures HTML',
      supportingText:  `<div class="ExternalClassA03244D9510C4E8D9CF13379104760ED"><br><table cellspacing="0" width="100%" 
      class="ms-rteTable-default"><tbody><tr class="ms-rteTableEvenRow-default"><td class="ms-rteTableEvenCol-default" style="width:6%;">
      ​​<img src="/assets/secretary.jpg" alt="Edu secretary.jpg" style="margin:5px;width:167px;" />​​<br></td>
      <td class="ms-rteTableOddCol-default" style="width:50%;"><span style="color:#444444;">
      ​<span style="font-family:&quot;open sans&quot;, arial, sans-serif;font-size:14px;text-align:justify;background-color:#ffffff;">
      At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias 
      excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. 
      Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus 
      id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.&#160;<br></span><br style=""><span style="">​</span>
      <span style="font-family:&quot;open sans&quot;, arial, sans-serif;font-size:14px;text-align:justify;">
      ​Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. 
      Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores 
      repella</span><span style="">​</span><br style=""><span style="">​</span><br style=""><span style="font-family:&quot;open sans&quot;,
       arial, sans-serif;font-size:14px;text-align:justify;">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis 
       praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, 
       similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et 
       expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime 
       placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.&#160;<br></span><br style=""><span style="">​</span>
       <span style="font-family:&quot;open sans&quot;, arial, sans-serif;font-size:14px;text-align:justify;">​Temporibus autem quibusdam et aut 
       officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. 
       Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repella
       </span><span style="">​</span><br style=""><div style="text-align:start;"><br></div><span style="">​</span>
       <span style="font-family:&quot;open sans&quot;, arial, sans-serif;font-size:14px;text-align:justify;">​
       Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. 
       Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repella</span>
       <span style="">​​</span><br></span></td></tr></tbody></table><p><br></p></div>`,
      size: '12',
      cardType: CardType.Standard,
      actions: [],
      sortOrder: '1',
      colour: 'CornflowerBlue',
      titleClass: 'CornflowerBlue',
      media: null,
      data: null
    }
  ],
  loading: false
}

export const briefs: { id: string; name: string }[] = [
  {
    id: '21066c5a-95e5-4d02-92e7-57b51ad350f5',
    name: 'Brief Summary For One'
  },
  {
    id: '5e1ce060-1e74-48a7-9847-f4698c23c0b4',
    name: 'Brief Summary For Redbook'
  },
  {
    id: '30f81c55-2ad5-4874-b396-d70e4d97b2ee',
    name: 'Brief Summary For Redbook 2'
  },
  {
    id: '6ea78eab-8174-487b-af86-ee5a782eddc4',
    name: 'Brief History of Time'
  },
  {
    id: 'ad39c0c6-4760-47c7-9efa-dfbcfd7e65c3',
    name: 'A Brief History of Humankind'
  }
]
