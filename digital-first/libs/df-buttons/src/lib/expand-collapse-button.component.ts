import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'digital-first-expand-collapse-button',
  template: `
  <span mdcIcon attr.aria-label="{{title}}" title="{{title}}" (click)="onChangeExpanded.emit(!expanded)">keyboard_arrow_{{expanded ? 'down' : 'right'}}</span>
  `,
  styles: [`
  :host {
    padding-right:4px;
  }
  `]
})
export class ExpandCollapseButtonComponent implements OnInit {

  @Input()
  expanded: boolean

  @Input()
  title = 'Toggle Expand Collapse'

  @Output()
  onChangeExpanded: EventEmitter<boolean> = new EventEmitter()

  constructor() { }

  ngOnInit() {
  }

}
