import { Component, OnInit, OnDestroy } from '@angular/core'
import { BehaviorSubject, Subscription, Observable } from 'rxjs'
import { FormBuilder } from '@angular/forms'
import { DocumentStatus, NavigatorTreeNode } from '@df/components'
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators'
import {
  discussionTree,
  statuslist,
  navigatorData,
  baconIpsum
} from './mock-data'
import { toTree, sortBy } from '@df/utils'
import { GetBriefByIdService } from '../../services/getBriefById/get-brief-by-id.service'

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
    private getBriefByIdService: GetBriefByIdService) {
    this.storyData = navigatorData
  }

  ngOnInit() {
    this.navData$.next(this.storyData)

    this.nodes$ = this.navData$.pipe(
      map(nd =>
        toTree(nd.sort(sortBy('order')), {
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

  public handleSelectNavigatorNode(node) {
    const navData = this.storyData.map(n => ({ ...n, active: false }))
    const found = { ...navData.find(n => n.id === node.id) }
    found.active = true
    const list = [...navData.filter(n => n.id !== node.id), found]
    this.navData$.next(list)
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

  handleEvent($event, action) {
    // tslint:disable-next-line:no-console
    console.log(`🦍 - ${action}`, $event)
  }
}
