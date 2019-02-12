import { Component, OnInit } from '@angular/core'
import { SelectAgenciesGQL, SelectAgencies, CreateUserGQL } from '../../../generated/graphql'
import {Subscription} from 'rxjs'
import {map} from 'rxjs/operators'
import { Observable } from 'rxjs'
import { FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router'

@Component({
  selector: 'digital-first-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {

  constructor(private selectAgenciesGQL: SelectAgenciesGQL,
    private formBuilder: FormBuilder,
    private router: Router,
    private createUserGQL: CreateUserGQL) { }

  agencies$: Observable<SelectAgencies.Agencies[]>
  addUserForm = this.formBuilder.group({
    emailAddress: [null, [Validators.required, Validators.email]],
    agencyId: [null, Validators.required]
  })
  ngOnInit() {

    this.agencies$ = this.selectAgenciesGQL
    .fetch({}, { fetchPolicy: 'network-only' })
    .pipe(map(result => result.data.agencies))

  }
  onSubmit() {
    this.createUserGQL.mutate({
      data: {
        emailAddress: this.addUserForm.value['emailAddress'],
        agencyId: this.addUserForm.value['agencyId']
      }
    }, {}).subscribe(({data}) =>
      this.router.navigate(['users', data.createUser.id]))
  }
  cancel() {
    return this.router.navigate(['users'])
  }
}
