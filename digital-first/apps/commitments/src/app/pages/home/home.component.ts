import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'digital-first-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  content = [
    '![image](https://cloud.githubusercontent.com/assets/389021/16107646/9729e556-33d8-11e6-933f-5b09fa3a53bb.png)',
        '# Heading 1',
        '## Heading 2',
        '    code block',
        '```js',
        'console.log("fenced code block");',
        '```',
        '[link](https://nhnent.github.io/tui.editor/)',
        '> block quote',
        '---',
        'horizontal line',
        '***',
        '`code`, *italic*, **bold**, ~~strikethrough~~, <span style="color:#e11d21">Red color</span>',
        '| @cols=2:merged |',
        '| --- | --- |',
        '| table | table |',
        '```chart',
        ',category1,category2',
        'Jan,21,23',
        'Feb,31,17',
        '',
        'type: column',
        'title: Monthly Revenue',
        'x.title: Amount',
        'y.title: Month',
        'y.min: 1',
        'y.max: 40',
        'y.suffix: $',
        '```',
        '```uml',
        'partition Conductor {',
        '  (*) --> "Climbs on Platform"',
        '  --> === S1 ===',
        '  --> Bows',
        '}',
        '',
        'partition Audience #LightSkyBlue {',
        '  === S1 === --> Applauds',
        '}',
        '',
        'partition Conductor {',
        '  Bows --> === S2 ===',
        '  --> WavesArmes',
        '  Applauds --> === S2 ===',
        '}',
        '',
        'partition Orchestra #CCCCEE {',
        '  WavesArmes --> Introduction',
        '  --> "Play music"',
        '}',
        '```'
  ].join('\n')

  constructor() {}

  ngOnInit() {}
}
