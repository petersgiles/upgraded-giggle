import {Component, OnInit} from '@angular/core';
import {Users, UsersGQL} from "../../generated/graphql";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

@Component({
  selector: 'digital-first-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  private users$: Observable<(Users.Users | null)[]>;

  constructor(private usersGQL: UsersGQL) {
  }

  ngOnInit() {
    this.users$ = this.usersGQL.watch({},
      {fetchPolicy: 'no-cache'})
      .valueChanges.pipe(map(value => value.data.users));
  }
}
