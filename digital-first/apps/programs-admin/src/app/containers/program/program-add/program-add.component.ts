import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AllAgencies, AllAgenciesGQL, AllProgramsGQL, AllStatistics, CreateProgramGQL} from "../../../generated/graphql";
import {Subscription} from "rxjs";
import {map} from "rxjs/operators";
import Agency = AllStatistics.Agency;
import {Router} from "@angular/router";

@Component({
  selector: 'digital-first-program-add',
  templateUrl: './program-add.component.html',
  styleUrls: ['./program-add.component.scss']
})
export class ProgramAddComponent implements OnInit, OnDestroy {

  agenciesSubscription$: Subscription;
  agencies: AllAgencies.Agencies[];

  addProgramForm = this.formBuilder.group({
    agencyId: [undefined, Validators.required],
    programName: [null, Validators.required],
    externalId: [null],
    notes: [''],
  });

  constructor(private formBuilder: FormBuilder,
              private allAgencies: AllAgenciesGQL,
              private allProgramsGQL: AllProgramsGQL,
              private router: Router,
              private createProgramGQL: CreateProgramGQL) {
  }

  private static CompareNames(a: Agency, b: Agency): number {
    if (a.title < b.title) {
      return -1;
    }
    if (a.title > b.title) {
      return 1;
    }
    return 0;
  }

  ngOnInit() {
    this.agenciesSubscription$ = this.allAgencies.watch({}, {fetchPolicy: 'cache-first'}).valueChanges
      .pipe(map(result => result.data.agencies)).subscribe(value => {
          this.agencies = value.sort(ProgramAddComponent.CompareNames);
        }
      )
  }

  onSubmit() {

    this.createProgramGQL.mutate({
      data: {
        agencyId: this.addProgramForm.value['agencyId'],
        name: this.addProgramForm.value['programName'],
        notes: this.addProgramForm.value['notes'],
        externalId: this.addProgramForm.value['externalId']
      }
    }, {}).subscribe(({data}) => {
      return this.router.navigate(['programs', data.program.id]);
    }, (error) => {
      console.log('there was an error sending the query', error);
    });
  }

  cancel() {
    return this.router.navigate(['programs']);
  }

  ngOnDestroy(): void {
    this.agenciesSubscription$.unsubscribe();
  }
}
