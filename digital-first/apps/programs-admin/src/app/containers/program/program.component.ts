import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {
  AllGroups,
  AllGroupsGQL,
  DeleteProgramGQL,
  Program,
  ProgramGQL,
  RemoveGroupFromProgramGQL
} from "../../generated/graphql";

@Component({
  selector: 'digital-first-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss']
})
export class ProgramComponent implements OnInit, OnDestroy {

  programs$: Observable<Program.Programs>;
  programId: string;
  groups$: Observable<(AllGroups.Groups | null)[]>;

  constructor(private programGQL: ProgramGQL,
              private route: ActivatedRoute,
              private deleteProgramGQL: DeleteProgramGQL,
              private removeGroupFromProgramGQL: RemoveGroupFromProgramGQL,
              private allGroupsGQL: AllGroupsGQL,
              private router: Router) {
  }

  edit(program) {
    return this.router.navigate(['programs/edit', program.id]);
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

  removeGroup(group: Program.Group, acl: Program.AccessControlList) {

    this.removeGroupFromProgramGQL.mutate({
      data: {
        accessControlGroupId: group.id,
        accessControlListId: acl.id
      }
    }, {
      refetchQueries: [{
        query: this.programGQL.document,
        variables: {
          "programId": this.programId
        }
      }]
    }).subscribe(value => {
      console.log('removing ', group, acl);
    });
  }

  delete(report: Program.Reports) {
    console.log('TODO: deleting program', report);
  }

  add(report: Program.Reports) {
    console.log('TODO: adding report', report)
  }

  ngOnInit() {
    this.programId = this.route.snapshot.paramMap.get('id');

    this.programs$ = this.programGQL.watch(
      {programId: this.programId},
      {fetchPolicy: 'no-cache'})
      .valueChanges.pipe(map(value => value.data.programs[0]));

    this.groups$ = this.allGroupsGQL.watch(
      {},
      {fetchPolicy: 'no-cache'})
      .valueChanges.pipe(map(value => value.data.groups));
  }

  ngOnDestroy(): void {
  }
}
