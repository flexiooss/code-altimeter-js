/* global require */
const path = require('path')
const TestCase = require('./src/Testable/TestCase')
const TestSuite = require('./src/Testable/TestSuite')
const TestError = require('./src/runner/TestError')
const testsPath = require('./src/testsPath')
const TestCaseExecutor = require('./src/TestExecutor/TestCaseExecutor')
const before = path.resolve(__dirname, './src/entries/before.js')
const after = path.resolve(__dirname, './src/entries/after.js')

module.exports = {
  TestCase: TestCase,
  TestCaseExecutor: TestCaseExecutor,
  TestSuite: TestSuite,
  TestError: TestError,
  testsPath: testsPath,
  entries: {
    before: before,
    after: after
  }
}
