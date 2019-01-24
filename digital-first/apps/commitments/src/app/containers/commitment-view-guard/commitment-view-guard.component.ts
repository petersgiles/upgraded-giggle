import { Component, OnInit, Input } from '@angular/core'
import { OPERATION_RIGHT_WRITE, OPERATION_RIGHT_READ, OPERATION_RIGHT_HIDE } from '../../services/app-data.service'

@Component({
  selector: 'digital-first-commitment-view-guard',
  templateUrl: './commitment-view-guard.component.html',
  styles: [``]
})
export class CommitmentViewGuardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input()
  operation

  WRITE = OPERATION_RIGHT_WRITE
  READ = OPERATION_RIGHT_READ
  HIDE = OPERATION_RIGHT_HIDE
}
