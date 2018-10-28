import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'digital-first-expand-collapse-button',
  template: `
  <a mdcIcon attr.aria-label="{{title}}" title="{{title}}" *ngIf="expanded" (click)="onChangeExpanded.emit(false)">expand_less</a>
  <a mdcIcon attr.aria-label="{{title}}" title="{{title}}" *ngIf="!expanded" (click)="onChangeExpanded.emit(true)">expand_more</a>
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
