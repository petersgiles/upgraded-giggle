import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import * as moment from 'moment'
import { Party } from '../../models/party.model'
import { Portfolio } from '../../models/portfolio.model'
import { AnnouncementType } from '../../models/announcement-type.model'
import { Commitment } from '../../reducers/commitment/commitment.model'
import { Electorate } from '../../models/location.model'
import { CommitmentType } from '../../models/commitment-type.model'
import { WhoAnnouncedType } from '../../models/who-announced-type.model'
import { Subscription } from 'rxjs'
import { debounceTime, distinctUntilChanged } from 'rxjs/operators'
import { CriticalDate } from '../../models/critical-date.model'
import { ThemeType } from '../../models/theme-type.model'
import { PackageType } from '../../models/package-type.model'
import { Status } from '../../models/status.model';

@Component({
  selector: 'digital-first-commitment-edit-form',
  templateUrl: './commitment-edit-form.component.html',
  styleUrls: ['./commitment-edit-form.component.scss']
})
export class CommitmentEditFormComponent implements OnDestroy {
  @Input() showSubmit = false
  @Input() submitButtonText = 'Submit'
  @Input() parties: Party[]
  @Input() portfolios: Portfolio[]

  _statuses: Status[]
  @Input()
  set statuses(val: Status[]) {
    if (val) {
      this._statuses = val
    }
  }

  get statuses(): Status[] {
    let mappedStatuses = null
    if(this._statuses)
    {
      mappedStatuses = this._statuses.map((status) => {
      return {
        ...status,
        caption: status ? status.title : ''

      }
    })
    }
    return mappedStatuses
  }

  @Input() announcementTypes: AnnouncementType[]
  @Input() themeTypes: ThemeType[]
  @Input() packageTypes: PackageType[]
  @Input() whoAnnouncedTypes: WhoAnnouncedType[]
  @Input() commitmentTypes: CommitmentType[]
  @Input() criticalDates: CriticalDate[]
  @Input() locations: Electorate[]
  @Input() busy: boolean

  formValueChangeSubscription: Subscription

  @Output() onSubmitted: EventEmitter<any> = new EventEmitter()
  @Output() onCancelled: EventEmitter<any> = new EventEmitter()
  @Output() onChanged: EventEmitter<Commitment> = new EventEmitter()



  form = this.fb.group({
    id: [],
    title: [null, Validators.required],
    description: [''],
    date: [null, Validators.required],
    status: [null],
    announcedby: [null],
    party: [null],
    announcementType: [null],
    whoAnnouncedType: [null],
    commitmentType: [null],
    portfolio: [null],
    criticalDate: [null],
    cost: [null],
    costingRequired: [false]
  })

  @Input()
  set commitment(val: Commitment) {
    if (val) {
      if (this.formValueChangeSubscription) {
        this.formValueChangeSubscription.unsubscribe()
      }

      const patch = {
        id: val.id,
        title: val.title,
        description: val.description,
        announcedby: val.announcedby,
        status: val.status && val.status.id,
        date: moment(val.date).format('YYYY-MM-DD'),
        party: val.party && val.party.id,
        whoAnnouncedType: val.whoAnnouncedType && val.whoAnnouncedType.id,
        announcementType: val.announcementType && val.announcementType.id,
        commitmentType: val.commitmentType && val.commitmentType.id,
        portfolio: val.portfolio && val.portfolio.id,
        criticalDate: val.criticalDate && val.criticalDate.id,
        cost: val.cost,
        costingRequired: val.costingRequired
      }

      this.form.patchValue(patch)

      this.formValueChangeSubscription = this.form.valueChanges
        .pipe(
          debounceTime(3000),
          distinctUntilChanged()
        )
        .subscribe(blurEvent => {
          this.handleChange(blurEvent)
          this.formValueChangeSubscription.unsubscribe()
        })
    }
  }

  get commitment(): Commitment {
    return this.mapCommitment(this.form.value)
  }

  constructor(private fb: FormBuilder) {}

  ngOnDestroy() {
    if (this.formValueChangeSubscription) {
      this.formValueChangeSubscription.unsubscribe()
    }
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
    return map
  }
}
