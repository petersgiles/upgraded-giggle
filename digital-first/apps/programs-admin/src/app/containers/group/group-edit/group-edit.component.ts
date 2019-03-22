import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import {
  GroupGQL,
  GroupQuery,
  UpdateAccessControlGroupGQL
} from '../../../generated/graphql'
import { ActivatedRoute, Router } from '@angular/router'
import { map } from 'rxjs/operators'
import { Observable, Subscription } from 'rxjs'
import { formConstants } from '../../../form-constants'

@Component({
  selector: 'digital-first-group-edit',
  templateUrl: './group-edit.component.html',
  styleUrls: ['./group-edit.component.scss']
})
export class GroupEditComponent implements OnInit, OnDestroy {
  editGroupForm = this.formBuilder.group({
    groupName: [
      null,
      [
        Validators.required,
        Validators.pattern(formConstants.emptyStringPattern),
        Validators.maxLength(formConstants.nameMaxLength)
      ]
    ]
  })

  groupId: string
  group$: Observable<GroupQuery['group']>
  rowVersion: string
  groupSubscription$: Subscription

  constructor(
    private formBuilder: FormBuilder,
    private updateAccessControlGroupGql: UpdateAccessControlGroupGQL,
    private groupGQL: GroupGQL,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.groupId = this.route.snapshot.paramMap.get('id')

    this.group$ = this.groupGQL
      .watch({ groupId: this.groupId }, { fetchPolicy: 'network-only' })
      .valueChanges.pipe(map(value => value.data.group))

    this.groupSubscription$ = this.group$.subscribe(value => {
      this.rowVersion = value.rowVersion
      this.editGroupForm.patchValue({
        groupName: value.title
      })
    })
  }

  onSubmit() {
    this.updateAccessControlGroupGql
      .mutate(
        {
          data: {
            title: this.editGroupForm.value['groupName'],
            rowVersion: this.rowVersion,
            id: this.groupId
          }
        },
        {}
      )
      .subscribe(({ data }) =>
        this.router.navigate(['groups', data.updateAccessControlGroup.id])
      )
  }

  cancel() {
    return this.router.navigate(['groups', this.groupId])
  }

  ngOnDestroy(): void {
    this.groupSubscription$.unsubscribe()
  }
}
