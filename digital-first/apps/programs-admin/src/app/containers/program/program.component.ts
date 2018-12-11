import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {Program, ProgramGQL} from "../../generated/graphql";

@Component({
  selector: 'digital-first-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss']
})
export class ProgramComponent implements OnInit {

  programs$: Observable<Program.Programs[]>;

  constructor(private programGQL: ProgramGQL, private route: ActivatedRoute) {
  }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');

    //TODO: investigate alternatives to these 'ids' approach which returns an array instead of a single
    this.programs$ = this.programGQL.watch({programId: id}).valueChanges.pipe(map(value => value.data.programs));
  }
}
