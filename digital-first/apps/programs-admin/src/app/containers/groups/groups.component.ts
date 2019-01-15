import {Component, OnInit} from '@angular/core'
import {AllGroups, AllGroupsGQL} from '../../generated/graphql'
import {map} from 'rxjs/operators'
import {Observable} from 'rxjs'
import {Router} from '@angular/router'

@Component({
  selector: 'digital-first-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
  private groups$: Observable<(AllGroups.Groups | null)[]>

  constructor(private allGroupsGQL: AllGroupsGQL,
              private router: Router) {
  }

  ngOnInit() {
    this.groups$ = this.allGroupsGQL.fetch({},
      {fetchPolicy: 'no-cache'})
      .pipe(map(value => {
        console.log(value)
        return         value.data.groups

        }
      ))
  }

  add() {
    return this.router.navigate(['groups', 'add'])
  }
}
