import { Component, OnInit } from '@angular/core'
import {
  SelectAgenciesGQL,
  GetUserGQL,
  UpdateUserGQL,
  SelectAgenciesQuery
} from '../../../generated/graphql'
import { Subscription, Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { FormBuilder, Validators } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'digital-first-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  constructor(
    private selectAgenciesGQL: SelectAgenciesGQL,
    private formBuilder: FormBuilder,
    private getUserGQL: GetUserGQL,
    private updateUserGQL: UpdateUserGQL,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  agencies$: Observable<SelectAgenciesQuery['agencies']>
  userSubscription$: Subscription
  userId: string
  rowVersion: string
  editUserForm = this.formBuilder.group({
    emailAddress: [null, [Validators.required, Validators.email]],
    agencyId: [null, Validators.required]
  })
  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id')
    this.agencies$ = this.selectAgenciesGQL
      .fetch({}, { fetchPolicy: 'network-only' })
      .pipe(map(result => result.data.agencies))

    this.userSubscription$ = this.getUserGQL
      .fetch({ id: this.userId }, { fetchPolicy: 'no-cache' })
      .pipe(map(value => value.data.user))
      .subscribe(user => {
        this.editUserForm.patchValue({
          emailAddress: user.emailAddress,
          agencyId: user.agency.id
        })
        this.rowVersion = user.rowVersion
      })
  }
  onSubmit() {
    this.updateUserGQL
      .mutate(
        {
          data: {
            emailAddress: this.editUserForm.value['emailAddress'],
            agencyId: this.editUserForm.value['agencyId'],
            rowVersion: this.rowVersion,
            id: this.userId
          }
        },
        {}
      )
      .subscribe(({ data }) => this.router.navigate(['users', this.userId]))
  }
  cancel() {
    return this.router.navigate(['users', this.userId])
  }
}
