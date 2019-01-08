import {Component, OnInit} from '@angular/core'
import {ActivatedRoute} from '@angular/router'
import {Group, GroupGQL} from '../../generated/graphql'
import {map} from 'rxjs/operators'
import {Subscription} from 'rxjs'

@Component({
  selector: 'digital-first-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
  private groupId: string
  private groupSubscription$: Subscription
  private group: Group.Groups

  constructor(private route: ActivatedRoute,
              private groupGQL: GroupGQL) {
  }

  ngOnInit() {

    this.groupId = this.route.snapshot.paramMap.get('id')

    this.groupSubscription$ = this.groupGQL
      .watch({groupId: this.groupId}, {fetchPolicy: 'network-only'})
      .valueChanges.pipe(map(value => value.data.groups[0]))
      .subscribe(group => {
        this.group = group
      })
  }
}
