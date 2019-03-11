import { TestBed } from '@angular/core/testing'

import {
  createSeqErrorEvent,
  formatErrorMessage,
  SeqService
} from './seq.service'

import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing'

import { HttpClientModule, HttpErrorResponse } from '@angular/common/http'

describe('SeqService', () => {
  let httpTestingController: HttpTestingController

  const graphQlError = {
    errors: [
      {
        message: 'Error trying to resolve entity.',
        locations: [{ line: 1, column: 2 }],
        path: ['somePath'],
        extensions: { code: 'some code' }
      }
    ]
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule]
    })

    httpTestingController = TestBed.get(HttpTestingController)
  })

  afterEach(() => {
    httpTestingController.verify()
  })

  it('should be created', () => {
    const service: SeqService = TestBed.get(SeqService)

    expect(service).toBeTruthy()
  })

  it('should post error to seq', () => {
    const response = new HttpErrorResponse({ error: graphQlError })

    const testResponse = { MinimumLevelAccepted: 'Information' }

    const service: SeqService = TestBed.get(SeqService)

    service.logToSeq(response).subscribe(value => {
      expect(value).toEqual(testResponse)
    })

    const req = httpTestingController.expectOne(
      'https://localhost:52629/api/events/raw'
    )

    expect(req.request.method).toEqual('POST')

    req.flush(testResponse)

    httpTestingController.verify()
  })

  it('should create SEQ raw event', () => {
    const error = new Error('test error message')

    const seqEvent = createSeqErrorEvent(error)

    expect(seqEvent.Exception).toEqual(error.stack)
    expect(seqEvent.Properties['message']).toEqual(error.message)
    expect(seqEvent.Level).toEqual('Error')
  })

  it('should create SEQ raw event for http error response', () => {
    const error = new HttpErrorResponse({ error: graphQlError })

    const seqEvent = createSeqErrorEvent(error)

    expect(seqEvent.Properties['message']).toEqual(
      graphQlError.errors[0].message
    )
    expect(seqEvent.Level).toEqual('Error')
  })

  it('should format multiple  errors graphql http error response', () => {
    const messageOne = 'message one'
    const messageTwo = 'message two'
    const error = {
      errors: [{ message: messageOne }, { message: messageTwo }]
    }

    const errorToFormat = new HttpErrorResponse({ error })
    const result = formatErrorMessage(errorToFormat)

    expect(result).toEqual(`${messageOne}, ${messageTwo}`)
  })
})
