import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'digital-first-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {

  @Input()
  tags

  @Output() onAddTag: EventEmitter<any> = new EventEmitter()
  constructor() { }

  ngOnInit() {
  }

}
