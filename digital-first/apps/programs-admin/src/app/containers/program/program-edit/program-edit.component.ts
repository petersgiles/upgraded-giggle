import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { Observable } from 'rxjs'
import {
  AllAgencies,
  AllAgenciesGQL,
  EditProgram,
  EditProgramGQL,
  UpdateProgramGQL
} from '../../../generated/graphql'
import { ActivatedRoute, Router } from '@angular/router'
import { map } from 'rxjs/operators'
import { Subscription } from 'rxjs'
import { formConstants } from '../../../form-constants'

@Component({
  selector: 'digital-first-program-edit',
  templateUrl: './program-edit.component.html',
  styleUrls: ['./program-edit.component.scss']
})
export class ProgramEditComponent implements OnInit, OnDestroy {
  programSubscription$: Subscription
  agencies$: Observable<AllAgencies.Agencies[]>
  programs$: Observable<EditProgram.Program>

  rowVersion: string

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
  programId: string

  constructor(
    private formBuilder: FormBuilder,
    private allAgencies: AllAgenciesGQL,
    private editProgramGQL: EditProgramGQL,
    private router: Router,
    private route: ActivatedRoute,
    private updateProgramGQL: UpdateProgramGQL
  ) {}

  ngOnInit() {
    this.agencies$ = this.allAgencies
      .fetch({}, { fetchPolicy: 'network-only' })
      .pipe(map(result => result.data.agencies))

    this.programId = this.route.snapshot.paramMap.get('id')

    this.programs$ = this.editProgramGQL
      .fetch({ programId: this.programId }, { fetchPolicy: 'network-only' })
      .pipe(map(value => value.data.program))

    this.programSubscription$ = this.programs$.subscribe(value => {
      this.rowVersion = value.rowVersion
      this.addProgramForm.patchValue({
        notes: value.notes,
        programName: value.name,
        externalId: value.externalId,
        agencyId: value.agency.id
      })
    })
  }

  onSubmit() {
    this.updateProgramGQL
      .mutate(
        {
          data: {
            agencyId: this.addProgramForm.value['agencyId'],
            name: this.addProgramForm.value['programName'],
            notes: this.addProgramForm.value['notes'],
            externalId: this.addProgramForm.value['externalId'],
            rowVersion: this.rowVersion,
            id: this.programId
          }
        },
        {}
      )
      .subscribe(({ data }) =>
        this.router.navigate(['programs', data.updateProgram.id])
      )
  }

  cancel() {
    return this.router.navigate(['programs', this.programId])
  }

  ngOnDestroy(): void {
    this.programSubscription$.unsubscribe()
  }
}
