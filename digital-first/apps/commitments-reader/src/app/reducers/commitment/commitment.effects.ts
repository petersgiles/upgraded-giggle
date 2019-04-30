import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { concatMap, filter } from 'rxjs/operators'
import { RouteChange, CHANGE, ofRoute } from '../router.actions'
import { AppDataService } from '../../services/'

@Injectable()
export class CommitmentEffects {

    @Effect()
  pizzaRouted$ = this.actions$.pipe(
    ofType(CHANGE),
    filter((routeChangeAction: RouteChange) => routeChangeAction.payload.path === 'commitment/:id'),
    concatMap(() => new LoadPizza())
  )

  @Effect() pizzaRouted = this.actions$.pipe(ofRoute('pizza/:id'))

constructor(private actions$: Actions, private service: AppDataService) { }
}