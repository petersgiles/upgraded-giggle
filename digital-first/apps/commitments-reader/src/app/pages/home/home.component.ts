import { Component, OnInit } from '@angular/core'
import { from, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const executeQueryAsyncPromise = (a): Promise<any> =>
  new Promise((resolve, reject) => {
    if (a) {
      resolve('ok')
    }
    reject('fail')
  })

const executeQueryAsObservable = (context) => from(executeQueryAsyncPromise(context))

@Component({
  selector: 'digital-first-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  constructor() {}

  ngOnInit() {

    executeQueryAsObservable(false).pipe(
      catchError((err: any) => {
        // tslint:disable-next-line: no-console
        console.log(`💥`, err)
        return of(err)})
    ).subscribe(result => {
        // tslint:disable-next-line: no-console
        console.log(`🙈`, result)
    })
  }
}
