import { Component, OnInit, OnDestroy } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { Router } from '@angular/router'
import { MdcDialog } from '@angular-mdc/web'

import {
  GetNavigations,
  ToggleExpand
} from '../../../reducers/navigation/navigation.actions'

import * as fromRoot from '../../../reducers/index'
import * as fromNavigation from '../../../reducers/navigation/navigation.reducer'


@Component({
  selector: 'digital-first-brief-layout',
  templateUrl: './brief-layout.component.html',
  styleUrls: ['./brief-layout.component.scss']
})
export class BriefLayoutComponent implements OnInit, OnDestroy {
  nodes$: any
  nodesSubcription: any;
  
  // tslint:disable-next-line:no-empty
  constructor(
    private router: Router,
    private store: Store<fromRoot.State>,
    public dialog: MdcDialog
  ) {}

  ngOnInit() {
    this.nodes$ = this.store.pipe(
      select(fromNavigation.selectNavigationNodeTreeState)
    )

    this.nodesSubcription = this.store.pipe(
      select(fromNavigation.selectNavigationNodeTreeState)
    ).subscribe(node => console.log(`navi`, node))

    this.store.dispatch(new GetNavigations())
  }

  public ngOnDestroy() {
  }

  public handleToggleExpandNavigatorNode($event) {
    this.store.dispatch(
      new ToggleExpand({ id: $event.node.data.id, expanded: $event.isExpanded })
    )
  }

  public handleSelectNavigatorNode(node) {
    this.router.navigate(['/', 'brief', node.data.briefId])
  }

  public handleToggleMoveNavigatorNode($event, action) {
    // tslint:disable-next-line:no-console
    console.log(`🐹 - ${action}`, $event)
  }

}
