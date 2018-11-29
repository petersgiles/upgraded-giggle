import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import * as moment from 'moment'
import { Contact } from '../../reducers/contact/contact.model'
import { Party } from '../../models/party.model'
import { Portfolio } from '../../models/portfolio.model'

@Component({
  selector: 'digital-first-contact-create-form',
  templateUrl: './contact-create-form.component.html',
  styleUrls: ['./contact-create-form.component.scss']
})
export class ContactCreateFormComponent implements OnInit {
  @Input() busy: boolean
  @Input() parties: Party[]
  @Input() portfolios: Portfolio[]
  @Input() contacts: Contact[]

  @Output() onSubmitted: EventEmitter<any> = new EventEmitter()
  @Output() onCancelled: EventEmitter<any> = new EventEmitter()
  @Output() onChanged: EventEmitter<Contact> = new EventEmitter()

  form = this.fb.group({
    id: [],
    firstName: [],
    name: ['', Validators.required],
    jobTitle: [],
    email: ['', Validators.required],
    phone: ['', Validators.required],
    portfolio: []
  })

  // convenience getter for easy access to form fields
  get controls() { return this.form.controls }

  constructor(private fb: FormBuilder) { }

  ngOnInit() { }

  handleReset($event) {
    this.form.reset()
    this.onChanged.emit(null)
  }

  handleSubmit($event) {
    const editedCommitment = this.mapFormToObject(this.form.value)
    this.onSubmitted.emit(editedCommitment)
  }

  handleChange($event) {
    const editedCommitment = this.mapFormToObject(this.form.value)
    this.onChanged.emit(editedCommitment)
  }

  mapFormToObject(formValue): any {
    const map: any = {
      ...formValue
    }

    return map
  }
}
