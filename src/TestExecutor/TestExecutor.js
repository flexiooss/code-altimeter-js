const TestReport = require('../Report/TestReport')
/**
 * @implements {TestExecutable}
 */
class TestExecutor {
  constructor(test) {
    this.__test = test
    this.__report = new TestReport(this.__test.name)
  }
  /**
   * @return {Report}
   */
  exec() {
    return this.__report
  }
}

module.exports = TestExecutor
