import {Component, OnInit} from '@angular/core'

import {AllAgencies, AllAgenciesGQL, AllPortfolios, AllPortfoliosGQL, MutatePortfolioGQL} from "../../generated/graphql"
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {UUID} from "@digital-first/df-utils";

@Component({
  selector: 'digital-first-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  agencies: Observable<AllAgencies.Agencies[]>;
  portfolios: Observable<AllPortfolios.Portfolios[]>;

  constructor(private allAgenciesGQL: AllAgenciesGQL,
              private allPortfoliosGQL: AllPortfoliosGQL,
              private mutatePortfolioGQL: MutatePortfolioGQL) {
  }

  ngOnInit() {

    // this.portfolios = this.allPortfoliosGQL.watch().valueChanges.pipe(map(value => value.data.portfolios));
    //
    // this.portfolios.subscribe(value => console.log(value));
    //
    // this.agencies = this.allAgenciesGQL.watch().valueChanges.pipe(map(result => result.data.agencies));
    //
    // this.agencies.subscribe(value => console.log(value))

  }

  mutate() {

    console.log('test');

    this.mutatePortfolioGQL.mutate({
      conversationId: UUID.UUID(),
      messageId: UUID.UUID(),
      portfolio: {id: "8FB9CD84-B6F0-4836-BB4A-072C4D537398", title: `dave was here at ${Date.now()}`}
    }).subscribe(value => console.log(value))
  }

}
