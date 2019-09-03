import { TestBed, getTestBed } from '@angular/core/testing'
import { BrowserDynamicTestingModule,
  platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing'
  
/* getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
)  */
type CompilerOptions = Partial<{
  providers: any[]
  useJit: boolean
  preserveWhitespaces: boolean
}>
export type ConfigureFn = (testBed: typeof TestBed) => void


export const configureTestsForSnap = (configure: ConfigureFn, compilerOptions: CompilerOptions = {}) => {
  const compilerConfig: CompilerOptions = {
    preserveWhitespaces: false,
    ...compilerOptions,
  }

  const configuredTestBed = TestBed.configureCompiler(compilerConfig)
  

  configure(configuredTestBed)

  return TestBed.compileComponents().then(() => configuredTestBed)
}

export const configureTests = (configure: (testBed: TestBed) => void) => {
  const testBed = getTestBed();

  if (testBed.platform == null) {
    testBed.initTestEnvironment(
      BrowserDynamicTestingModule,
      platformBrowserDynamicTesting());
  }

  configure(testBed);

  return testBed.compileComponents().then(() => testBed);
};