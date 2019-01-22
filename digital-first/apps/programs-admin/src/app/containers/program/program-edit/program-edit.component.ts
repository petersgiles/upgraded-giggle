import {Component, OnDestroy, OnInit} from '@angular/core'
import {FormBuilder, Validators} from '@angular/forms'
import {Observable} from 'rxjs'
import {
  AllAgencies, AllAgenciesGQL, EditProgram, EditProgramGQL, UpdateProgramGQL
} from '../../../generated/graphql'
import {ActivatedRoute, Router} from '@angular/router'
import {map} from 'rxjs/operators'
import {Subscription} from 'rxjs'

@Component({
  selector: 'digital-first-program-edit',
  templateUrl: './program-edit.component.html',
  styleUrls: ['./program-edit.component.scss']
})
export class ProgramEditComponent implements OnInit, OnDestroy {

  agenciesSubscription$: Subscription
  programSubscription$: Subscription
  agencies: AllAgencies.Agencies[]
  programs$: Observable<EditProgram.Programs>

  rowVersion: string

  addProgramForm = this.formBuilder.group({
    agencyId: [undefined, Validators.required],
    programName: [null, Validators.required],
    externalId: [null],
    notes: ['']
  })
  programId: string

  constructor(private formBuilder: FormBuilder,
              private allAgencies: AllAgenciesGQL,
              private editProgramGQL: EditProgramGQL,
              private router: Router,
              private route: ActivatedRoute,
              private updateProgramGQL: UpdateProgramGQL) {
  }

  ngOnInit() {
    this.agenciesSubscription$ = this.allAgencies.watch(
      {},
      {fetchPolicy: 'cache-first'}).valueChanges
      .pipe(map(result => result.data.agencies))
      .subscribe(value => {
          this.agencies = value
        }
      )

    this.programId = this.route.snapshot.paramMap.get('id')

    this.programs$ = this.editProgramGQL.watch(
      {programId: this.programId},
      {fetchPolicy: 'network-only'})
      .valueChanges.pipe(map(value => value.data.programs[0]))

    this.programSubscription$ = this.programs$.subscribe(
      value => {
        this.rowVersion = value.rowVersion
        this.addProgramForm.patchValue({
          notes: value.notes,
          programName: value.name,
          externalId: value.externalId,
          agencyId: value.agency.id
        })

        console.log('program', value)
      })
  }

  onSubmit() {

    this.updateProgramGQL.mutate({
      data: {
        agencyId: this.addProgramForm.value['agencyId'],
        name: this.addProgramForm.value['programName'],
        notes: this.addProgramForm.value['notes'],
        externalId: this.addProgramForm.value['externalId'],
        rowVersion: this.rowVersion,
        id: this.programId
      }
    }, {}).subscribe(({data}) =>
      this.router.navigate(['programs', data.updateProgram.id]))
  }

  cancel() {
    return this.router.navigate(['programs', this.programId])
  }

  ngOnDestroy(): void {
    this.agenciesSubscription$.unsubscribe()
    this.programSubscription$.unsubscribe()
  }
}
