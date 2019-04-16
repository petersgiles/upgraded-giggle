import { Component, OnInit, OnDestroy } from '@angular/core'
import { BehaviorSubject, Subscription, Observable } from 'rxjs'
import { FormBuilder } from '@angular/forms'
import { DocumentStatus, NavigatorTreeNode } from '@df/components'
import {
  debounceTime,
  distinctUntilChanged,
  map,
  tap,
  first
} from 'rxjs/operators'
import {
  discussionTree,
  statuslist,
  navigatorData,
  baconIpsum
} from './mock-data'
import { toTree, sortBy } from '@df/utils'
import { GetBriefByIdService } from '../../services/getBriefById/get-brief-by-id.service'
import { GetPackNavigationService } from '../../services/getPackNavigation/get-pack-navigation.service'
import { GetPackNavigationGQL } from '../../generated/graphql'

const defaultBrief = {
  status: '1'
}

@Component({
  selector: 'digital-first-brief',
  templateUrl: './brief.component.html',
  styleUrls: ['./brief.component.scss']
})
export class BriefComponent implements OnInit, OnDestroy {
  public nodes$: Observable<any>
  public navData$: BehaviorSubject<NavigatorTreeNode[]> = new BehaviorSubject(
    []
  )
  public briefHtml$: BehaviorSubject<string> = new BehaviorSubject(baconIpsum)
  public background$: BehaviorSubject<string> = new BehaviorSubject('#455a64')
  public documentStatusList$: BehaviorSubject<any>

  public comments$: BehaviorSubject<Comment[]> = new BehaviorSubject(
    discussionTree
  )
  public activeComment$: BehaviorSubject<Comment> = new BehaviorSubject(null)

  public form = this.fb.group({
    status: [null]
  })

  public formValueChangeSubscription$: Subscription
  public storyData: NavigatorTreeNode[]
  public nodesSubscription$: Subscription
  public tree: any

  // tslint:disable-next-line:no-empty
  constructor(
    private fb: FormBuilder,
    private getBriefByIdService: GetBriefByIdService,
    private getPackNavigationService: GetPackNavigationService
  ) {}

  ngOnInit() {
    this.getPackNavigationService
      .getPackNavigation()
      .pipe(
        // tslint:disable-next-line:no-console
        tap(result => console.log('getPackNavigation', result))
      )
      .subscribe(nodes => this.navData$.next(nodes))

    this.nodes$ = this.navData$.pipe(
      map((nd: NavigatorTreeNode[]) =>
        toTree((nd || []).sort(sortBy('order')), {
          id: 'id',
          parentId: 'parent',
          children: 'children',
          level: 'level'
        })
      )
    )

    this.nodesSubscription$ = this.nodes$.subscribe(p => (this.tree = p))

    this.documentStatusList$ = new BehaviorSubject(statuslist)

    this.form.patchValue(defaultBrief)

    this.formValueChangeSubscription$ = this.form.valueChanges
      .pipe(
        debounceTime(3000),
        distinctUntilChanged()
      )
      .subscribe(blurEvent => {
        this.handleChange(blurEvent)
        this.formValueChangeSubscription$.unsubscribe()
      })
  }

  public ngOnDestroy() {
    this.nodesSubscription$.unsubscribe()
  }

  handleChange($event) {
    const editedBrief = this.mapFormToBrief(this.form.value)

    // tslint:disable-next-line:no-console
    console.log('🐛 - handleChange', $event)
  }

  mapFormToBrief(brief): any {
    const editedBrief: any = {
      ...brief
    }
    return editedBrief
  }

  handleSubmit($event) {
    // tslint:disable-next-line:no-console
    console.log('🐛 - handleSubmit', $event)
  }

  handleSelect($event) {
    // tslint:disable-next-line:no-console
    console.log(`🐋 -  Select`, $event)
  }

  public handleToggleExpandNavigatorNode($event) {
    // tslint:disable-next-line:no-console
    console.log(`🎯 -  handleToggleExpandNavigatorNode`, $event.node)

    this.getPackNavigationService
      .toggleExpandPackNavigationNode({
        id: $event.node.id,
        isExpanded: $event.node.isExpanded
      })
      .pipe(first())
      .subscribe()
  }

  public handleSelectNavigatorNode(node) {
    // tslint:disable-next-line:no-console
    console.log(`🎯 -  HandleSelectNavigatorNode`, node)

    this.getPackNavigationService
      .activatePackNavigationNode({ id: node.id, isActive: node.isActive })
      .pipe(first())
      .subscribe()
  }

  public handleReplyToComment($event) {
    // tslint:disable-next-line:no-console
    console.log(`💬 -  ReplyToComment`, $event)
  }
  public handleDeleteComment($event) {
    // tslint:disable-next-line:no-console
    console.log(`💬 -  DeleteComment`, $event)
  }
  public handleAddComment($event) {
    // tslint:disable-next-line:no-console
    console.log(`💬 -  AddComment`, $event)
  }

  public handleEvent($event, action) {
    // tslint:disable-next-line:no-console
    console.log(`🦍 - ${action}`, $event)
  }
}
