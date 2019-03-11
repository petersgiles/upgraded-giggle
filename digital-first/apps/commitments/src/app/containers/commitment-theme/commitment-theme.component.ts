import { Component, Input, OnInit, OnDestroy } from '@angular/core'
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop'
import { Observable, Subscription } from 'rxjs'
import { MdcDialog } from '@angular-mdc/web'
import { OPERATION_COMMITMENT_THEME } from '../../services/app-data.service'
import { CommitmentLookupService } from '../../reducers/commitment-lookup/commitment-lookup.service'
import { Theme } from '../../models'
import { CommitmentThemeService } from '../../reducers/commitment-theme/commitment-theme.service';

@Component({
  selector: 'digital-first-commitment-theme',
  templateUrl: './commitment-theme.component.html',
  styleUrls: ['./commitment-theme.component.scss']
})
export class CommitmentThemeComponent implements OnInit, OnDestroy {
  title = 'Related Themes'
  _commitment: number
  userOperation$: Observable<any>
  themeSubscription$: Subscription
  themes: Theme[]
  commitmentThemes$: Observable<Theme[]>
  expandedSubscription$: Subscription
  expanded: boolean
  commitmentThemesSubscription$: Subscription

  constructor(
    public dialog: MdcDialog,
    private service: CommitmentThemeService,
    private lookup: CommitmentLookupService
  ) {}

  @Input()
  set commitment(val: number) {
    this._commitment = val
    if (val) {
      this.service.getThemesByCommitment(val)
    }
  }

  get commitment() {
    return this._commitment
  }

  getRight(operations: any) {
    return operations[OPERATION_COMMITMENT_THEME]
  }

  handleChangeExpanded(expanded) {
    // tslint:disable-next-line:no-console
    console.log(expanded)

    if (expanded) {
      this.service.expandPanel()
    } else {
      this.service.collapsePanel()
    }
  }

  ngOnDestroy(): void {
    this.themeSubscription$.unsubscribe()
    this.commitmentThemesSubscription$.unsubscribe()
    this.expandedSubscription$.unsubscribe()
  }

  ngOnInit(): void {
    this.commitmentThemesSubscription$ = this.service.CommitmentThemes.subscribe(
      next => {
        // tslint:disable-next-line:no-console
        console.log(next)
        this.related = next || []
      }
    )

    this.themeSubscription$ = this.lookup.ThemeTypes.subscribe(next => {
      // tslint:disable-next-line:no-console
      console.log(next)
      // the function is used to create a closure
      this.themes = (next || [])
    })

    this.expandedSubscription$ = this.service.Expanded.subscribe(
      p => {
        console.log(p)
        this.expanded = p
      }
    )
    this.userOperation$ = this.service.UserOperation
    this.lookup.getAllPortfolios()
  }

  related = []

  addTheme(event: CdkDragDrop<string[]>) {
    if (event.previousContainer !== event.container) {
      const theme: any = event.previousContainer.data[event.previousIndex]
      this.service.addThemeToCommitment(this.commitment, theme.id)
    }
  }

  removeTheme(event: CdkDragDrop<string[]>) {
    if (event.previousContainer !== event.container) {
    const theme: any = event.previousContainer.data[event.previousIndex]
// tslint:disable-next-line:no-console
console.log(theme)
    this.service.removeThemeFromCommitment(this.commitment, theme.id)
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      )
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      )
    }
  }
}
