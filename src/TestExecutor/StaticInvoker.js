class StaticInvoker {
  /**
   *
   * @param {HaveTestExecutor} testExecutable
   * @param {TestRun} runner
   */
  constructor(testExecutable, runner) {
    /**
     *
     * @params {HaveTestExecutor}
     * @private
     */
    this.__testCase = testExecutable
    /**
     *
     * @params {TestRun}
     * @private
     */
    this.__runner = runner
  }

  /**
   *
   * @return {StaticInvoker}
   */
  invokeBeforeClass() {
    this.__testCase.beforeClass()
    if (this.__runner.isVerbose()) {
      console.log('\x1b[36m%s\x1b[0m', `
    
------------------------------------------------------
Start test case ${this.__testCase.name} `)
    }
    return this
  }

  /**
   *
   * @return {StaticInvoker}
   */
  invokeAfterClass() {
    this.__testCase.afterClass()
    if (this.__runner.isVerbose()) {
      console.log('\x1b[36m%s\x1b[0m', `------------------------------------------------------
Finish test case ${this.__testCase.name} 
`)
    }
    return this
  }
}

module.exports = StaticInvoker
