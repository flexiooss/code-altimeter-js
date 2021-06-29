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
    return new Promise(resolve => {


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
        testCase[this._testName].call(null)
          .then(() => {
            this._logPass(testCase)
            this._incrementTestPass()
          })
          .catch((e) => {
            console.log(1)
            this._logError(testCase, e)
            this._incrementTestFail()
          })
          .finally(() => {
            if (this._runner.isVerbose()) {
              console.log('\x1b[90m%s\x1b[0m', `------------------------------
tearDown ${this._testName} 
`)
            }
            testCase.tearDown()
            resolve(this._report)
          })
      } catch (e) {
        console.log(2)

        this._logError(testCase, e)
        this._incrementTestFail()
        if (this._runner.isVerbose()) {
          console.log('\x1b[90m%s\x1b[0m', `------------------------------
tearDown ${this._testName} 
`)
        }

        testCase.tearDown()
        resolve(this._report)
      }

    })
  }


}

module.exports = AsyncTestExecutor
