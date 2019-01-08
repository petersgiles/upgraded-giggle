import {Component, OnInit} from '@angular/core';
import {AllGroups, AllGroupsGQL} from "../../generated/graphql";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

@Component({
  selector: 'digital-first-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
  private groups$: Observable<(AllGroups.Groups | null)[]>;

  constructor(private allGroupsGQL: AllGroupsGQL) {
  }

  ngOnInit() {
    this.groups$ = this.allGroupsGQL.watch({},
      {fetchPolicy: 'no-cache'})
      .valueChanges.pipe(map(value => value.data.groups))
  }

  add() {
    //TODO: add group feature
    alert('TODO:  add group feature')
  }
}
