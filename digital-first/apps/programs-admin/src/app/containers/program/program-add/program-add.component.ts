import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import {
  AllAgenciesGQL, AllAgenciesQuery,
  AllProgramsGQL,
  CreateProgramGQL
} from '../../../generated/graphql'
import { Subscription } from 'rxjs'
import { map } from 'rxjs/operators'
import { Router } from '@angular/router'
import { formConstants } from '../../../form-constants'

@Component({
  selector: 'digital-first-program-add',
  templateUrl: './program-add.component.html',
  styleUrls: ['./program-add.component.scss']
})
export class ProgramAddComponent implements OnInit, OnDestroy {
  agenciesSubscription$: Subscription
  agencies: AllAgenciesQuery['agencies']

  addProgramForm = this.formBuilder.group({
    agencyId: [undefined, Validators.required],
    programName: [
      null,
      [
        Validators.required,
        Validators.pattern(formConstants.emptyStringPattern),
        Validators.maxLength(formConstants.nameMaxLength)
      ]
    ],
    externalId: [''],
    notes: ['']
  })

  constructor(
    private formBuilder: FormBuilder,
    private allAgencies: AllAgenciesGQL,
    private allProgramsGQL: AllProgramsGQL,
    private router: Router,
    private createProgramGQL: CreateProgramGQL
  ) {}

  ngOnInit() {
    this.agenciesSubscription$ = this.allAgencies
      .watch({}, { fetchPolicy: 'cache-first' })
      .valueChanges.pipe(map(result => result.data.agencies))
      .subscribe(value => {
        this.agencies = value
      })
  }

  onSubmit() {
    this.createProgramGQL
      .mutate(
        {
          data: {
            agencyId: this.addProgramForm.value['agencyId'],
            name: this.addProgramForm.value['programName'],
            notes: this.addProgramForm.value['notes'],
            externalId: this.addProgramForm.value['externalId']
          }
        },
        {}
      )
      .subscribe(({ data }) =>
        this.router.navigate(['programs', data.createProgram.id])
      )
  }

  cancel() {
    return this.router.navigate(['programs'])
  }

  ngOnDestroy(): void {
    this.agenciesSubscription$.unsubscribe()
  }
}
