import { Component, OnInit, Input } from '@angular/core'

@Component({
  selector: 'digital-first-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {

  @Input()
  tags

  constructor() { }

  ngOnInit() {
  }

}
