import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { FormBuilder, Validators, FormArray } from '@angular/forms'
import * as moment from 'moment'
import { Party } from '../../reducers/party/party.model'
import { Portfolio } from '../../reducers/portfolio/portfolio.model'
import { AnnouncementType } from '../../reducers/announcement-type/announcement-type.model'
import { Commitment } from '../../reducers/commitment/commitment.model'
import { Location } from '../../reducers/location/location.model'
import { Comment } from '../../reducers/comment/comment.model'

@Component({
  selector: 'digital-first-commitment-edit-form',
  templateUrl: './commitment-edit-form.component.html',
  styleUrls: ['./commitment-edit-form.component.scss']
})
export class CommitmentEditFormComponent  implements OnInit {

  @Input() parties: Party[]
  @Input() portfolios: Portfolio[]
  @Input() announcementTypes: AnnouncementType[]
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
    type: [''],
    portfolio: [],
    cost: [''],
    contacts: ['']
  })

  @Input()
  set commitment(val: Commitment) {
    if (val) {

      const patch = {
        id: val.id,
        title: val.title,
        location: val.location.id,
        description: val.description,
        announcedby: val.announcedby,
        date: moment(val.date).format('YYYY-MM-DD'),
        party: val.party.id,
        type: val.announcementType.id,
        portfolio: val.portfolio.id,
        cost: val.cost,
        contacts: val.contacts
      }

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
    const map: any = {
      title: commitment.title,
      party: this.parties.find(p => p.id === Number(commitment.party)) as Party,
      description: commitment.description,
      cost: commitment.cost,
      location: this.locations.find(l => l.id === Number(commitment.location)) as Location,
      type: this.announcementTypes.find(p => p.id === Number(commitment.type)) as AnnouncementType,
      date: moment(commitment.date).format(),
      announcedby: commitment.announcedby,
      portfolio: this.portfolios.find(p => p.id === Number(commitment.portfolio)) as Portfolio,
      contacts: commitment.contacts
    }

    if (commitment.id) {
      map.id = commitment.id
    }

    // tslint:disable-next-line:no-console
    console.log('mapCommitment', commitment, map)
    return map
  }

}
