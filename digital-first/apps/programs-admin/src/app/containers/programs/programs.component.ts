import {
  Component,
  OnDestroy,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core'
import {
  AllProgramsSearch,
  AllProgramsSearchGQL
} from '../../generated/graphql'
import { Subscription } from 'rxjs'
import { Router } from '@angular/router'

@Component({
  selector: 'digital-first-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgramsComponent implements OnDestroy {
  programs: AllProgramsSearch.Programs[]
  subscriptions$: Subscription[] = []
  searchText = ''

  constructor(
    private searchProgramsGQL: AllProgramsSearchGQL,
    private changeDetector: ChangeDetectorRef,
    private router: Router
  ) {}

  add() {
    return this.router.navigate(['programs', 'add'], {
      skipLocationChange: true
    })
  }

  doSearch() {
    if (!this.searchText) {
      return
    }

    const searchSubscription$ = this.searchProgramsGQL
      .watch(
        { name: this.searchText },
        {
          fetchPolicy: 'no-cache',
          context: { debounceKey: 'programs', debounceTimeout: 400 }
        }
      )
      .valueChanges.subscribe(value => {
        this.programs = value.data.programs
        this.changeDetector.detectChanges()
      })

    this.subscriptions$ = [...this.subscriptions$, searchSubscription$]
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions$) {
      if (subscription && subscription.unsubscribe) {
        subscription.unsubscribe()
      }
    }
  }
}
