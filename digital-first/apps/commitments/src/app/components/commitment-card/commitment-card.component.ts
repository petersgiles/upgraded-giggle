import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { Commitment } from '../../reducers/commitment/commitment.model'
import { DateFormatPipe } from '@digital-first/df-moment';

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

  constructor(private dateTime: DateFormatPipe) { }

  ngOnInit() {
  }

  getCommitmentSummary(cc: Commitment) :string {
    return "Announced " +
      (cc.announcedby ? ` by <strong>${cc.announcedby}</strong>`: '') +
      (cc.date ? ` on <strong>${this.dateTime.transform(cc.date, 'LL')}</strong> `: '') +
      " for " +
      (cc.party ? `<strong>${cc.party.title}</strong>` : '') +
      " as a " +
      (cc.announcementType ? `<strong>${cc.announcementType.title}</strong>` : '') +
      (cc.whoAnnouncedType ? ` by <strong>${cc.whoAnnouncedType.title}</strong>` : '') +
     ( cc.criticalDate ? ` to be delivered by <strong>${cc.criticalDate.title}</strong>` : '')

  }

  getCommitmentCostSummary(cc: Commitment): string {
    return  'This is a ' +
    (cc.commitmentType ? `<strong>${cc.commitmentType.title}</strong> ` : '') +
    ' commitment ' +
    (cc.cost ? `with a party funding commitment of <strong> ${cc.cost} million</strong> dollars` : '')
  }

  getPartyStyle(item) {
    const style = {}

    if (item && item.party) {
      if (item.party.colour) {
        style['border-left'] = `${item.party.colour} 3px solid`
      }

      // if (item.party.icon) {
      //   style['background-image'] = `url(${item.party.icon})`
      // }
      return style
    }
  }
}
