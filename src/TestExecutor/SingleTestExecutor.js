const TestReport = require('../Report/TestReport')
const TestExecutor = require('./TestExecutor')

/**
 * @implements {TestExecutable}
 */
class SingleTestExecutor extends TestExecutor {
  /**
   * @return {TestReport}
   */
  exec() {
    this._execTest()
    return this
  }
}

module.exports = TestExecutor
