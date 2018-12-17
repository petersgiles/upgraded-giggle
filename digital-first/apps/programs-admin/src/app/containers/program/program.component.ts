import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {DeleteProgramGQL, Program, ProgramGQL} from "../../generated/graphql";

@Component({
  selector: 'digital-first-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss']
})
export class ProgramComponent implements OnInit, OnDestroy {

  programs$: Observable<Program.Programs>;

  constructor(private programGQL: ProgramGQL,
              private route: ActivatedRoute,
              private deleteProgramGQL: DeleteProgramGQL,
              private router: Router) {
  }

  edit(program) {
    this.router.navigate(['programs/edit', program.id]);
  }

  deleteProgram(program) {
    this.deleteProgramGQL.mutate({
      data: {
        id: program.id
      }
    }, {}).subscribe(value => {
      return this.router.navigate(['programs']);
    });
  }

  delete(report: Program.Reports) {
    console.log('TODO: deleting program', report);
  }

  add(report: Program.Reports) {
    console.log('TODO: adding report', report)
  }

  ngOnInit() {
    const programId = this.route.snapshot.paramMap.get('id');

    this.programs$ = this.programGQL.watch(
      {programId: programId},
      {fetchPolicy: 'no-cache'})
      .valueChanges.pipe(map(value => value.data.programs[0]));
  }

  ngOnDestroy(): void {
  }
}
