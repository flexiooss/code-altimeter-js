const StaticInvoker = require('./StaticInvoker')
const AsyncTestExecutor = require('./AsyncTestExecutor')

/**
 * @implements {TestExecutable}
 */
class AsyncSingleTestExecutor extends AsyncTestExecutor{
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
   * @return {Promise<Report>}
   */
  async exec() {
    this.__staticInvoker.invokeBeforeClass()

    await this._execTest()

    this.__staticInvoker.invokeAfterClass()

    return new Promise(resolve => {
      resolve(this._report)
    })
  }

}

module.exports = AsyncSingleTestExecutor
