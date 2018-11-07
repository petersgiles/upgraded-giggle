import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class Logger {
  info: any
  warn: any
  error: any
}

@Injectable()
export class LoggerService implements Logger {
  info: any
  warn: any
  error: any

  invokeConsoleMethod(type: string, args?: any): void {}
}
