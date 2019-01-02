import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {map, first} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {
  AllGroupsGQL,
  DeleteProgramGQL,
  Program,
  ProgramGQL,
  RemoveGroupFromProgramGQL,
  AssignGroupToProgramGQL,
  AccessRights,
  UpdateGroupPermissionsForProgramGQL
} from '../../generated/graphql';
import {DataTableConfig} from '@digital-first/df-components';
import {MdcDialog} from '@angular-mdc/web';
import {DialogAssignGroupPermissionComponent} from '../../dialogs/dialog-assign-group-permission.component';
import {
  ARE_YOU_SURE_ACCEPT,
  DialogAreYouSureComponent
} from '@digital-first/df-dialogs';

@Component({
  selector: 'digital-first-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss']
})
export class ProgramComponent implements OnInit, OnDestroy {
  program: Program.Programs;
  programId: string;
  permissionTableData: any;
  programReportTableData: any;
  programsSubscription$: Subscription;

  constructor(
    private programGQL: ProgramGQL,
    private route: ActivatedRoute,
    private deleteProgramGQL: DeleteProgramGQL,
    private removeGroupFromProgramGQL: RemoveGroupFromProgramGQL,
    private assignGroupToProgramGQL: AssignGroupToProgramGQL,
    private updateGroupPermissionsForProgramGQL: UpdateGroupPermissionsForProgramGQL,
    private allGroupsGQL: AllGroupsGQL,
    private router: Router,
    public dialog: MdcDialog
  ) {
  }

  handleEditProgrm(program) {
    return this.router.navigate(['programs/edit', program.id]);
  }

  handleDeleteProgram(program) {
    const dialogRef = this.dialog.open(DialogAreYouSureComponent, {
      escapeToClose: true,
      clickOutsideToClose: true
    });

    dialogRef
      .afterClosed()
      .pipe(first())
      .subscribe(result => {
        if (result === ARE_YOU_SURE_ACCEPT && this.program) {
          this.deleteProgramGQL
            .mutate(
              {
                data: {
                  id: program.id
                }
              },
              {}
            )
            .subscribe(value => this.router.navigate(['programs']));
        }
      });
  }

  ngOnInit() {
    this.programId = this.route.snapshot.paramMap.get('id');

    this.programsSubscription$ = this.programGQL
      .watch({programId: this.programId}, {fetchPolicy: 'network-only'})
      .valueChanges.pipe(map(value => value.data.programs[0]))
      .subscribe(program => {
        this.program = program;

        this.permissionTableData = this.createProgramPermissionGroupTableData(
          program
        );

        this.programReportTableData = this.createProgramReportTableData(
          program
        );
      });
  }

  ngOnDestroy(): void {
    this.programsSubscription$.unsubscribe();
  }

  handleGroupPermissionGroupClicked($event) {
    console.log('handleGroupPermissionGroupClicked', $event);
  }

  handleGroupPermissionChangeClicked(row) {

    //TODO: investigate why this mutation is not updating the cache automatically.  It is to do with
    //not being able to find it because it has no ID in response of the mutation that it can match in the case?
    //this combined with the refetchquery is causing the odd switching of buttons values.
    this.updateGroupPermissionsForProgramGQL

      .mutate(
        {
          data: {
            accessControlGroupId: row.id,
            programId: this.programId,
            accessRights: row.cell.value,
            rowVersion: row.row.data.rowVersion
          }
        },
        {
          refetchQueries: [
            {
              query: this.programGQL.document,
              variables: {
                programId: this.programId
              }
            }
          ]
        }
      )
      .pipe(first())
      .subscribe(value => {
      });
  }

  handleGroupPermissionDeleteClicked($event) {
    this.removeGroupFromProgramGQL
      .mutate(
        {
          data: {
            accessControlGroupId: $event.id,
            accessControlListId: $event.data.acl
          }
        },
        {
          refetchQueries: [
            {
              query: this.programGQL.document,
              variables: {
                programId: this.programId
              }
            }
          ]
        }
      )
      .pipe(first())
      .subscribe(value => {
        console.log('removing ', $event);
      });
  }

  handleOpenAddGroupDialog() {
    this.allGroupsGQL
      .watch({}, {fetchPolicy: 'no-cache'})
      .valueChanges.pipe(
      map(value => value.data.groups),
      first()
    )
      .subscribe(groups => {
        const dialogRef = this.dialog.open(
          DialogAssignGroupPermissionComponent,
          {
            escapeToClose: true,
            clickOutsideToClose: true,
            data: {
              groups: groups
            }
          }
        );

        dialogRef.afterClosed().subscribe((result: any) => {
          if (result && result.id) {
            this.assignGroupToProgramGQL
              .mutate(
                {
                  data: {
                    accessControlGroupId: result.id,
                    programId: this.programId,
                    accessRights: AccessRights.Read,
                    rowVersion: '' //TODO: what to do here as row version is not available as it is new record
                  }
                },
                {
                  refetchQueries: [
                    {
                      query: this.programGQL.document,
                      variables: {
                        programId: this.programId
                      }
                    }
                  ]
                }
              )
              .pipe(first())
              .subscribe(value => {
                console.log('adding ', result);
              });
          }
        });
      });
  }

  handleProgramReportDeleteItemClicked($event) {
    console.log('handleProgramReportDeleteItemClicked ', $event);
  }

  handleProgramReportAddItemDialog($event) {
    console.log('handleProgramReportAddItemDialog ', $event);
  }

  handleReportNavigation($event) {
    console.log('handleReportNavigation ', $event);
  }

  private createProgramReportTableData(program: Program.Programs): any {
    const reports = program.reports.map(report => ({
      id: report.id,
      name: report.name,
      notes: report.notes
    }));

    const rows = (reports || []).map(r => ({
      id: r.id,
      data: r,
      cells: [
        {
          value: `${r.name}`
        },
        {
          value: r.notes
        }
      ]
    }));

    return {
      title: 'reports',
      hasDeleteItemButton: true,
      headings: [{caption: 'Name'}, {caption: 'Notes'}],
      rows: rows
    };
  }

  private createProgramPermissionGroupTableData(program: Program.Programs): DataTableConfig {
    const groups = {};
    program.accessControlList.forEach(acl => {
      acl.accessControlEntries.forEach(ace => {
        ace.group.forEach(grp => {
          const rights = ace.rights;
          groups[grp.title] = {
            id: grp.id,
            acl: acl.id,
            title: grp.title,
            rights: rights,
            rowVersion: ace.rowVersion
          };
        });
      });
    });
    const rows = (Object.keys(groups) || []).map(g => {
      const group = groups[g];
      return {
        id: group.id,
        data: group,
        cells: [
          {
            value: `${group.title}`,
            id: 'GROUPCELL'
          },
          {
            value: group.rights.toUpperCase(),
            type: 'radio',
            id: 'PERMISSIONCELL',
            data: [
              {value: AccessRights.Read, caption: 'Read'},
              {value: AccessRights.Write, caption: 'Read/Write'}
            ]
          }
        ]
      };
    });

    return {
      title: 'permissions',
      hasDeleteItemButton: true,
      headings: [{caption: 'Name'}, {caption: 'Permission'}],
      rows: rows
    };
  }
}
