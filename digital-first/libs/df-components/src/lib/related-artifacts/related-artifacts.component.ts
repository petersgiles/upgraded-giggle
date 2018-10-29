import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'

export class RelatedLink {
  id: string
  icon: string
  caption: string
}

@Component({
  selector: 'digital-first-related-artifacts',
  templateUrl: './related-artifacts.component.html',
  styleUrls: ['./related-artifacts.component.scss']
})
export class RelatedArtifactsComponent implements OnInit {

  @Input()
  links: RelatedLink[]

  @Output()
  onDeleteRelated: EventEmitter<any> = new EventEmitter()

  @Output()
  onAddRelated: EventEmitter<any> = new EventEmitter()

  constructor() { }

  ngOnInit() {
  }

}
