const TestExecutor = require('./TestExecutor')

/**
 * @implements {TestExecutable}
 */
class AsyncTestExecutor extends TestExecutor {
  /**
   *
   * @param {TestCase} testCase
   * @param {string} testName
   * @param {TestRun} runner
   */
  constructor(testCase, testName, runner) {
    super(testCase, testName, runner)
  }

  /**
   *
   * @return {TestReport}
   * @protected
   */
  async _execTest() {
    /**
     * @type {TestCase}
     */
    const testCase = this._newTestCase()

    if (this._runner.isVerbose()) {
      console.log(`Test  ${this._testName}`)
    }

    if (this._runner.isVerbose()) {
      console.log('\x1b[90m%s\x1b[0m', `------------------------------------
Setup ${this._testName} 
`)
    }

    testCase.setUp()
    try {
      await testCase[this._testName].call(testCase)
      this._incrementTestPass()
      this._logPass(testCase)
    } catch (e) {
      this._incrementTestFail()
      this._logError(testCase, e)
    } finally {
      if (this._runner.isVerbose()) {
        console.log('\x1b[90m%s\x1b[0m', `------------------------------
tearDown ${this._testName}
`)
      }
      testCase.tearDown()
    }
    return this._report
  }


}

module.exports = AsyncTestExecutor
