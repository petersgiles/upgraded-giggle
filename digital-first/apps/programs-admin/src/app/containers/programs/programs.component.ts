import {Component, OnInit} from '@angular/core';
import {AllPrograms, AllProgramsGQL} from "../../generated/graphql";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

@Component({
  selector: 'digital-first-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.scss']
})
export class ProgramsComponent implements OnInit {

  programs$: Observable<AllPrograms.Programs[]>;

  constructor(private allProgramsGQL: AllProgramsGQL) {
  }

  ngOnInit() {
    this.programs$ = this.allProgramsGQL.watch({},
      {fetchPolicy: 'no-cache'})
      .valueChanges.pipe(map(value => value.data.programs));
  }
}
