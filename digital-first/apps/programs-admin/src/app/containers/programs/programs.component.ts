import {Component, OnInit} from '@angular/core';
import {AllPrograms, AllProgramsGQL, Program, ProgramGQL} from "../../generated/graphql";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

@Component({
  selector: 'digital-first-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.scss']
})
export class ProgramsComponent implements OnInit {

  programs$: Observable<AllPrograms.Programs[]>;

  constructor(private allProgramsGQL: AllProgramsGQL,
              private programGQL: ProgramGQL) {
  }

  ngOnInit() {
    this.programs$ = this.allProgramsGQL.watch().valueChanges.pipe(map(value => value.data.programs));
  }
}
