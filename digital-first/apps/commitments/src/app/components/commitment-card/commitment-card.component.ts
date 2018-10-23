import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { Commitment } from '../../reducers/commitment/commitment.model'

@Component({
  selector: 'digital-first-commitment-card',
  templateUrl: './commitment-card.component.html',
  styleUrls: ['./commitment-card.component.scss']
})
export class CommitmentCardComponent implements OnInit {

  @Input() commitment: Commitment
  @Input() config: { disabled: boolean } = { disabled: false }
  @Output() onEdit: EventEmitter<Commitment> = new EventEmitter()
  @Output() onShare: EventEmitter<Commitment> = new EventEmitter()

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
