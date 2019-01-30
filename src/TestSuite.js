const TestSuiteExecutor = require('./TestExecutor/TestSuiteExecutor')

module.exports = class TestSuite {
  constructor() {
    /**
     *
     * @type {Array<TestCase>}
     * @private
     */
    this.__test = []
  }

  exec() {
    new TestSuiteExecutor(this).exec()
  }

  /**
   *
   * @param {TestCase} test
   * @return {TestSuite}
   */
  addTestCase(test) {
    this.__test.push(test)
    return this
  }
}
