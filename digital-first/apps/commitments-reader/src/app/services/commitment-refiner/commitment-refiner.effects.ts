import { Injectable } from '@angular/core'
import {
  RefinerActionTypes,
  RefinerAction} from './commitment-refiner.actions'
import { Observable, concat } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class RefinerEffects {
  private effects = {}

  register(action: RefinerActionTypes, effect: any): void {
    this.effects[action] = [...(this.effects[action] || [])]
    this.effects[action].push(effect)
  }

  hasEffect(action: RefinerAction): boolean {
    const effectList: Observable<any>[] = this.effects[action.type] || []
    return effectList.length > 0
  }

  run(action: RefinerAction): Observable<any> {
    const effectList: Observable<any>[] = this.effects[action.type] || []

    return concat(effectList).pipe(map((func: any) => func(action)))
  }
}
