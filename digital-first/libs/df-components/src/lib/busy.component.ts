import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core'

@Component({
  selector: 'digital-first-busy',
  template: `
  <button attr.aria-label="{{title}}" *ngIf="busy" title="{{title}}" mdc-button><mdc-icon class="heartbeat">{{icon}}</mdc-icon><span [innerHtml]="title | safeHtml"></span></button>
`,
styles: [`
:host {
  padding-right:4px;
}
`]
})
export class BusyComponent implements OnInit {

  @Input()
  icon = 'autorenew'

  @Input()
  title = 'Busy'

  @Input()
  busy: false

  constructor() { }

  ngOnInit() {
  }

}
