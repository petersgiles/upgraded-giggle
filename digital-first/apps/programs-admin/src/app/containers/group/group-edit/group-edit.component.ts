import {Component, OnDestroy, OnInit} from '@angular/core'
import {FormBuilder, Validators} from '@angular/forms'
import {Group, GroupGQL, UpdateAccessControlGroupGQL} from '../../../generated/graphql'
import {ActivatedRoute, Router} from '@angular/router'
import {map} from 'rxjs/operators'
import {Observable, Subscription} from 'rxjs'

@Component({
  selector: 'digital-first-group-edit',
  templateUrl: './group-edit.component.html',
  styleUrls: ['./group-edit.component.scss']
})
export class GroupEditComponent implements OnInit, OnDestroy {

  editGroupForm = this.formBuilder.group({
    groupName: [null, Validators.required]
  })

  groupId: string
  group$: Observable<Group.Groups | null>
  rowVersion: string
  groupSubscription$: Subscription

  constructor(private formBuilder: FormBuilder,
              private updateAccessControlGroupGql: UpdateAccessControlGroupGQL,
              private groupGQL: GroupGQL,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.groupId = this.route.snapshot.paramMap.get('id')

    this.group$ = this.groupGQL.watch(
      {groupId: this.groupId},
      {fetchPolicy: 'network-only'})
      .valueChanges.pipe(map(value => value.data.groups[0]))

    this.groupSubscription$ = this.group$.subscribe(
      value => {
        this.rowVersion = value.rowVersion
        this.editGroupForm.patchValue({
          groupName: value.title
        })
      })
  }

  onSubmit() {
    this.updateAccessControlGroupGql.mutate({
      data: {
        title: this.editGroupForm.value['groupName'],
        rowVersion: this.rowVersion,
        id: this.groupId
      }
    }, {}).subscribe(({data}) =>
      this.router.navigate(['groups', data.updateAccessControlGroup.id]), (error) => {
      console.log('there was an error sending the query', error)
    })
  }

  cancel() {
    return this.router.navigate(['groups', this.groupId])
  }

  ngOnDestroy(): void {
    this.groupSubscription$.unsubscribe()
  }
}
