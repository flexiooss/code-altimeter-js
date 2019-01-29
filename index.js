const TestCase = require('./src/TestCase')
const TestSuite = require('./src/TestSuite')
const TestError = require('./src/TestError')
const testsPath = require('./src/testsPath')

module.exports = {
  TestCase: TestCase,
  TestSuite: TestSuite,
  TestError: TestError,
  testsPath: testsPath
}
