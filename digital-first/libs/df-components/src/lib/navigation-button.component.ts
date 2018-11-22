import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core'

@Component({
  selector: 'digital-first-navigation-item-button',
  template: `
  <button attr.aria-label="{{title}}" title="{{title}}" (click)="onNavigate.emit()" mdc-button dense><mdc-icon>{{icon}}</mdc-icon>{{title}}</button>
`,
styles: [`
:host {
  padding-right:4px;
}
`]
})
export class NavigateButtonComponent implements OnInit {

  @Input()
  icon = 'chevron_left'

  @Input()
  title = 'Back'

  @Output()
  onNavigate: EventEmitter<null> = new EventEmitter()

  constructor() { }

  ngOnInit() {
  }

}
