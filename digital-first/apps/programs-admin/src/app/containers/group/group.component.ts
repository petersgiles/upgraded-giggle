import {Component, OnInit} from '@angular/core'
import {ActivatedRoute, Router} from '@angular/router'
import {DeleteGroupGQL, Group, GroupGQL, RemoveUserFromGroupGQL} from '../../generated/graphql'
import {first, map} from 'rxjs/operators'
import {Subscription} from 'rxjs'
import {ARE_YOU_SURE_ACCEPT, DialogAreYouSureComponent} from '@digital-first/df-dialogs'
import {MdcDialog} from '@angular-mdc/web'

@Component({
  selector: 'digital-first-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
  private groupId: string
  private groupSubscription$: Subscription
  private group: Group.Groups

  userTableData: any

  constructor(private route: ActivatedRoute,
              private groupGQL: GroupGQL,
              private deleteGroupGQL: DeleteGroupGQL,
              private removeUserFromGroupGQL: RemoveUserFromGroupGQL,
              private router: Router,
              public dialog: MdcDialog) {
  }

  ngOnInit() {

    this.groupId = this.route.snapshot.paramMap.get('id')

    this.groupSubscription$ = this.groupGQL
      .watch({groupId: this.groupId}, {fetchPolicy: 'network-only'})
      .valueChanges.pipe(map(value => value.data.groups[0]))
      .subscribe(group => {
        this.group = group
        this.userTableData = this.group.members
      })
  }

  handleEditGroup(group: Group.Groups) {
    return this.router.navigate(['groups/edit', group.id])
  }

  handleDeleteGroup(group: Group.Groups) {

    const dialogRef = this.dialog.open(DialogAreYouSureComponent, {
      escapeToClose: true,
      clickOutsideToClose: true
    })

    dialogRef
      .afterClosed()
      .pipe(first())
      .subscribe(result => {
        if (result === ARE_YOU_SURE_ACCEPT && this.group) {
          this.deleteGroupGQL
            .mutate(
              {
                data: {
                  id: group.id
                }
              },
              {}
            )
            .subscribe(value => this.router.navigate(['groups']))
        }
      })
  }

  handleUserDeleteItemClicked($event) {
    this.removeUserFromGroupGQL
      .mutate(
        {
          data: {
            userId: $event.id,
            accessControlGroupId: this.groupId
         }
        },
        {
          refetchQueries: [
            {
              query: this.groupGQL.document,
              variables: {
                groupId: this.groupId
              }
            }
          ]
        }
      )
      .pipe(first())
      .subscribe(value => {
        console.log('removing ', $event)
      })
  }

  handleUserNavigation($event: any) {
    return this.router.navigate(['users/', $event.id])
  }
}
