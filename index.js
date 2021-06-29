/* global require */
const path = require('path')
const TestCase = require('./src/js/Testable/TestCase')
const TestSuite = require('./src/js/Testable/TestSuite')
const TestError = require('./src/js/runner/TestError')
const testsPath = require('./src/js/testsPath')
const runTest = require('./src/js/runner/TestRun')
const TestCaseExecutor = require('./src/js/TestExecutor/TestCaseExecutor')
const before = path.resolve(__dirname, './src/entries/before.js')
const after = path.resolve(__dirname, './src/entries/after.js')

module.exports = {
  runTest: runTest,
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
