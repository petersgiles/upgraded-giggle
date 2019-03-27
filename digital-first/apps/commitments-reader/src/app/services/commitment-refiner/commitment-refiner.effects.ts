import { Injectable } from '@angular/core'
import { RefinerActionTypes, RefinerAction } from './commitment-refiner.actions'

@Injectable({
  providedIn: 'root'
})
export class RefinerEffects {
  private effects = {}

  register(action: RefinerActionTypes, effect: any): void {
    this.effects[action] = [...(this.effects[action] || [])]
    this.effects[action].push(effect)
  }

  run(action: RefinerAction) {
    const effectList: any[] = this.effects[action.type] || []
    // tslint:disable-next-line:no-console
    console.log(action.type, `Running ${effectList.length} effects`)
    effectList.forEach(effect => {
      // tslint:disable-next-line:no-console
      console.log('effect', action)
      effect(action)
    })
  }
}
