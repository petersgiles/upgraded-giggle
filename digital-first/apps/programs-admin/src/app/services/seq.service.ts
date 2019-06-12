import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { environment } from '../../environments/environment'

interface MappedEvent {
  "@l": string
  "@mt": string
  "ClientVersion":  string
  "ClientApplication": string
  "@t": string
  "@x": string
}

export function formatErrorMessage(errorToFormat: HttpErrorResponse): string {
  // graphql errorLink will augment message, locations, path onto the error.
  if (errorToFormat.error && errorToFormat.error.errors) {
    return errorToFormat.error.errors
      .map(errorToJoin => errorToJoin.message)
      .join(', ')
  }

  return errorToFormat.message
}

export function createSeqErrorEvent(
  error: Error | HttpErrorResponse
): MappedEvent {
  const mappedEvent: MappedEvent = {
    "@t": new Date().toISOString(),
    "@l": 'Error',
    "@mt": 'Programs admin client application error. {message}.',
    ClientVersion: `${environment.version} (#${environment.commitHash})`,
    "ClientApplication": 'ProgramsAdmin',
    "@x": ''
  }

  if (error instanceof HttpErrorResponse) {
    mappedEvent['@x'] = formatErrorMessage(error)
  }

  if (error instanceof Error && error.stack) {
    mappedEvent['@x'] = error.stack
  }

  mappedEvent['message'] = error.message

  return mappedEvent
}

@Injectable({
  providedIn: 'root'
})
export class SeqService {
  constructor(private httpClient: HttpClient) {}

  logToSeq(error: Error | HttpErrorResponse) {
    const event = createSeqErrorEvent(error)

    return this.httpClient.post(
      `${environment.datasource.adminApiUrl}/events/raw`,
       event
    )
  }
}
