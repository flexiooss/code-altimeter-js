export class StaticInvoker {
  constructor(testExecutable) {
    this.__testCase = testExecutable
  }

  /**
   *
   * @return {StaticInvoker}
   */
  invokeBeforeClass() {
    this.__testCase.constructor.beforeClass()
    if (this.__runner.isVerbose()) {
      console.log('\x1b[36m%s\x1b[0m', `
    
------------------------------------------------------
Start test case ${this.__testCase.constructor.name} `)
    }
    return this
  }

  /**
   *
   * @return {StaticInvoker}
   */
  invokeAfterClass() {
    this.__testCase.constructor.afterClass()
    if (this.__runner.isVerbose()) {
      console.log('\x1b[36m%s\x1b[0m', `------------------------------------------------------
Finish test case ${this.__testCase.constructor.name} 
`)
    }
    return this
  }
}
