import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { environment } from '../../environments/environment'

interface MappedEvent {
  Level: string
  MessageTemplate: string
  Properties: { clientVersion: string }
  Timestamp: string
  Exception: string
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
    Level: 'Error',
    MessageTemplate: 'Programs admin client application error: {message}.',
    Properties: {
      clientVersion: `${environment.version} (#${environment.commitHash})`
    },
    Timestamp: new Date().toISOString(),
    Exception: ''
  }

  if (error instanceof HttpErrorResponse) {
    const props = {
      ...mappedEvent.Properties,
      message: formatErrorMessage(error)
    }
    mappedEvent.Properties = props
  }

  if (error instanceof Error && error.stack) {
    mappedEvent.Exception = error.stack

    const props = {
      ...mappedEvent.Properties,
      message: error.message
    }
    mappedEvent.Properties = props
  }
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
      JSON.stringify({ Events: [event] })
    )
  }
}
