import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import * as moment from 'moment'
import { Party } from '../../reducers/party/party.model'
import { Portfolio } from '../../reducers/portfolio/portfolio.model'
import { AnnouncementType } from '../../reducers/announcement-type/announcement-type.model'
import { Commitment } from '../../reducers/commitment/commitment.model'
import { Location } from '../../reducers/location/location.model'
import { CommitmentType } from '../../reducers/commitment-type/commitment-type.model'
import { WhoAnnouncedType } from '../../reducers/who-announced-type/who-announced-type.model'

@Component({
  selector: 'digital-first-commitment-edit-form',
  templateUrl: './commitment-edit-form.component.html',
  styleUrls: ['./commitment-edit-form.component.scss']
})
export class CommitmentEditFormComponent  implements OnInit {

  @Input() parties: Party[]
  @Input() portfolios: Portfolio[]
  @Input() announcementTypes: AnnouncementType[]
  @Input() whoAnnouncedTypes: WhoAnnouncedType[]
  @Input() commitmentTypes: CommitmentType[]
  @Input() locations: Location[]

  @Output() onSubmitted: EventEmitter<any> = new EventEmitter()
  @Output() onCancelled: EventEmitter<any> = new EventEmitter()
  @Output() onChanged: EventEmitter<Commitment> = new EventEmitter()

  form = this.fb.group({
    id: [],
    title: ['', Validators.required],
    location: [''],
    description: [''],
    announcedby: [''],
    date: [''],
    party: [''],
    announcementType: [''],
    whoAnnouncedType: [''],
    commitmentType: [''],
    portfolio: [],
    cost: [''],
  })

  @Input()
  set commitment(val: Commitment) {
    if (val) {

      const patch = {
        id: val.id,
        title: val.title,
        location: val.location && val.location.id,
        description: val.description,
        announcedby: val.announcedby,
        date: moment(val.date).format('YYYY-MM-DD'),
        party: val.party && val.party.id,
        whoAnnouncedType: val.whoAnnouncedType && val.whoAnnouncedType.id,
        announcementType: val.announcementType && val.announcementType.id,
        commitmentType: val.commitmentType && val.commitmentType.id,
        portfolio: val.portfolio && val.portfolio.id,
        cost: val.cost,
      }

      // tslint:disable-next-line:no-console
      console.log(patch)

      this.form.patchValue(patch)
    }
  }

  get commitment(): Commitment {
    return this.mapCommitment(this.form.value)
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  handleReset($event) {
    this.form.reset()
    this.onChanged.emit(null)
  }

  handleSubmit($event) {
    const editedCommitment = this.mapCommitment(this.form.value)
    this.onSubmitted.emit(editedCommitment)
  }

  handleChange($event) {
    const editedCommitment = this.mapCommitment(this.form.value)
    this.onChanged.emit(editedCommitment)
  }

  mapCommitment(commitment): any {
    const map: Commitment = {
      ...commitment,
      date: moment(commitment.date).format(),
    }

    // tslint:disable-next-line:no-console
    console.log('mapCommitment', commitment, map)
    return map
  }

}
