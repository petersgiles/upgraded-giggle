import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { environment } from '../../../environments/environment'

interface Token {
  name?: string;
  raw?: string;
}



const messageHeader = 'Digital First logging:'



@Injectable({
  providedIn: 'root'
})
export class SeqService {
  message: string
  error: string
  stackTrace: string
  
  headers: HttpHeaders
  constructor(private httpClient: HttpClient) {
    this.headers = new HttpHeaders({
      ProgramsApiKey: environment.apiKey
  })
  }

  parseError(error: any): string{
    let template: string
    this.message = error.message
    this.stackTrace = error.stacktrace.replace(/'(.+)'/g, '$1').replace(/(\r\n|\n|\r)/gm, '')
    this.error = error.errorMessage.replace(/'(.+)'/g, '$1').replace(/(\r\n|\n|\r)/gm, '')
    const messageTemplate = `{'@mt':'${this.message}  error: {error} stackTrace: {stackTrace}', '@l':'error', 'error': '${this.error}', 'stackTrace': '${this.stackTrace}'}`
    return messageTemplate
  }

  parseError_(error: any): string{
    let result: string
    if(!error.messageTemplate){
      result = `{'@mt':'${error}'}`
    } else {
      const tokens = this.tokenize(error.messageTemplate)
      // stage 1: build something like: '@mt':'Digital First logging: app: {app} error: {error} stacktrace: {stacktrace}'
      result = `{'@mt':'${messageHeader}`
      if (tokens.length){
        for (let i = 0; i < tokens.length; ++i) {
          result = result + ` ${tokens[i].name}: {${tokens[i].name})}}`
        }
      }
      result = result + `',`
      // state 2: add the level - usually 'error' rendering '@l':'error'
      if(error.eventLevel){
        result = result + `'@l':'${error.eventLevel}',`
      }

      // Stage 3: add the key pairs from stage 1: 'app': 'some message', 'error': 'some error message', 'stacktrace': 'some stack trace'
      // also remove any single quotes in the body of the message: server will throw bad request message (400) otherwise
      if (tokens.length){
        for (let i = 0; i < tokens.length; ++i) {
          result = result + `'${tokens[i].name}': '${tokens[i].raw.replace(/'(.+)'/g, '$1') }',`
        }
      }
      result = result.substring(0, result.length - 1) + '}'
    }
    // stage 4: reomve line feeds
      return result.replace(/(\r\n|\n|\r)/gm, '')
    }

    tokenize(template: []): Token[]{
      const tokens = []
      template.forEach((item: any) => {
        for (let i in item) {
          if (item.hasOwnProperty(i)){
            tokens.push({name: i, raw: item[i]})
        }
      }
      })
      return tokens
    }

  logToSeq(error: any | HttpErrorResponse) {
    // suppressErrors: boolean = true;
    let s =  this.parseError(error)
    return this.httpClient.post(
      `${environment.loggingSource.loggingServiceUrl}`,
      this.parseError(error), { headers: this.headers}
    )
  }

}
