import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { Commitment } from '../../reducers/commitment'

@Component({
  selector: 'digital-first-commitment-list',
  templateUrl: './commitment-list.component.html',
  styleUrls: ['./commitment-list.component.scss']
})
export class CommitmentListComponent implements OnInit {

  @Input() commitments: Commitment[]
  @Input() config: { disabled: boolean } = { disabled: false }
  @Output() onEdit: EventEmitter<Commitment> = new EventEmitter()
  constructor() { }

  ngOnInit() {
  }

  getPartyStyle(item) {

    const style = {}

    if (item && item.party) {

      if (item.party.colour) {
        style['background-color'] = item.party.colour
      }

      if (item.party.icon) {
        style['background-image'] = `url(${item.party.icon})`
      }
      return style
    }
  }

}
