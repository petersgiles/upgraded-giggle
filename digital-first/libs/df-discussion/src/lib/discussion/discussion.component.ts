import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { TimeAgoPipe, CalendarPipe, DateFormatPipe } from '@digital-first/df-moment'

@Component({
  selector: 'digital-first-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.scss'],
  providers: [TimeAgoPipe, CalendarPipe, DateFormatPipe]
})
export class DiscussionComponent implements OnInit {

  @Input()
  activeComment

  @Input()
  hostId

  @Input()
  comments

  @Input()
  timeFormat

  @Output() onDeleteComment: EventEmitter<any> = new EventEmitter()
  @Output() onReplyToComment: EventEmitter<any> = new EventEmitter()
  @Output() onAddComment: EventEmitter<any> = new EventEmitter()

  constructor(private timeAgo: TimeAgoPipe, private calendar: CalendarPipe, private dateFormat: DateFormatPipe) { }

  ngOnInit() {
  }

  getIndent(level): any {
    return { 'margin-left.px': level * 10 }
  }

  getSecondaryText(comment) {

    const text = []
    if (comment.author) {
      text.push(comment.author.name)
    }

    switch (this.timeFormat) {

      case 'timeAgo':
        text.push(this.timeAgo.transform(comment.created))
        break
      case 'calendar':
        text.push(this.calendar.transform(comment.created))
        break

      case 'dateFormat':
        text.push(this.dateFormat.transform(comment.created, 'LL'))
        break

      default:
        text.push(comment.created)
    }

    return text.join(', ')
  }

  hasChildren(comment): boolean {
    return comment.children && comment.children.length > 0
  }

  hasParent(comment): boolean {
    return !!comment.parent
  }

  handleResetTextFieldValue(input: any) {
    input.setValue(null)
    this.onReplyToComment.emit(null)
  }

  handleDeleteComment(comment) {
    this.onDeleteComment.emit({
      hostId: this.hostId,
      id: comment.id
    })
  }

  handleAddComment(comment: any, input: any) {
    this.onAddComment.emit({
      hostId: this.hostId,
      parent: comment,
      text: input.value
    })

    input.setValue(null)
  }
}
