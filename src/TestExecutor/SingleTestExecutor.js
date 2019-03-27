const TestExecutor = require('./TestExecutor')
const StaticInvoker = require('./StaticInvoker')

/**
 * @implements {TestExecutable}
 */
class SingleTestExecutor extends TestExecutor {
  /**
   *
   * @param {TestCase} testCase
   * @param {string} testName
   * @param {TestRun} runner
   */
  constructor(testCase, testName, runner) {
    super(testCase, testName, runner)
    /**
     * @params {StaticInvoker}
     * @private
     */
    this.__staticInvoker = new StaticInvoker(this._testCase, runner)
  }

  /**
   * @return {TestReport}
   */
  exec() {
    this.__staticInvoker.invokeBeforeClass()

    this._execTest()

    this.__staticInvoker.invokeAfterClass()

    return this._report
  }
}

module.exports = SingleTestExecutor
