import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'digital-first-archive-button',
  template: `
    <button attr.aria-label="{{title}}" title="{{title}}" (click)="onArchiveItem.emit()" mdc-button dense><mdc-icon>{{icon}}</mdc-icon>{{title}}</button>
  `,
  styles: [`
  :host {
    padding-right:4px;
    width: 200px;
  }
`]

})
export class ArchiveButtonComponent implements OnInit {

  @Input()
  icon = 'archive'

  @Input()
  title = 'Archive'

  @Output()
  onArchiveItem: EventEmitter<null> = new EventEmitter()

  constructor() { }

  ngOnInit() {
  }

}
