import { Component, OnInit, Input } from '@angular/core';
import * as fromRoot from '../../../reducers/index'
import { Store } from '@ngrx/store'
import { FormBuilder } from '@angular/forms'
import { SetActiveBriefProtectiveMarking } from '../../../reducers/brief/brief.actions';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { Subscription, BehaviorSubject } from 'rxjs';
import { classifications, dlms } from '../mock-data';

const defaultValues = {
  securityClassification: "UNCLASSIFIED",
  dLM: "Sensitive",
}


@Component({
  selector: 'digital-first-protective-marking',
  templateUrl: './protective-marking.component.html',
  styleUrls: ['./protective-marking.component.scss']
})
export class ProtectiveMarkingComponent implements OnInit {

  @Input()
  brief

  constructor() {}

  ngOnInit() {

  }
}