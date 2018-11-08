import { isPlatformBrowser } from '@angular/common'
import { ClassProvider, FactoryProvider, InjectionToken, PLATFORM_ID } from '@angular/core'

/* Create a new injection token for injecting the localStorage into a component. */
export const LOCALSTORAGE = new InjectionToken('LocalStorageToken')

/* Define abstract class for obtaining reference to the global localStorage object. */
export abstract class LocalStorageRef {

  get nativeLocalStorage(): any {
    throw new Error('Not implemented.')
  }

}

/* Define class that implements the abstract class and returns the native localStorage object. */
export class BrowserLocalStorageRef extends LocalStorageRef {

  constructor() {
    super()
  }

  get nativeLocalStorage(): any {
    return localStorage
  }

}

/* Create an factory function that returns the native localStorage object. */
export function localStorageFactory(browserLocalStorageRef: BrowserLocalStorageRef, platformId: Object): any {
  if (isPlatformBrowser(platformId)) {
    return browserLocalStorageRef.nativeLocalStorage
  }
  return new Object()
}

/* Create a injectable provider for the LocalStorageRef token that uses the BrowserLocalStorageRef class. */
const browserLocalStorageProvider: ClassProvider = {
  provide: LocalStorageRef,
  useClass: BrowserLocalStorageRef
}

/* Create an injectable provider that uses the localStorageFactory function for returning the native localStorage object. */
const localStorageProvider: FactoryProvider = {
  provide: LOCALSTORAGE,
  useFactory: localStorageFactory,
  deps: [ LocalStorageRef, PLATFORM_ID ]
}

/* Create an array of providers. */
export const LOCALSTORAGE_PROVIDERS = [
  browserLocalStorageProvider,
  localStorageProvider
]