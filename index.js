const path = require('path')
const TestCase = require('./src/TestCase')
const TestSuite = require('./src/TestSuite')
const TestError = require('./src/TestError')
const testsPath = require('./src/testsPath')
const executionContext = require('./src/executionContext.js')
const pathForExecutionContext = path.resolve(__dirname, './src/executionContext.js')

module.exports = {
  TestCase: TestCase,
  TestSuite: TestSuite,
  TestError: TestError,
  testsPath: testsPath,
  executionContext: executionContext,
  pathForExecutionContext: pathForExecutionContext
}
