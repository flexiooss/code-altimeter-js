const TestRun = require('../runner/TestRun')
const runTest = require('../runner/runTest')

module.exports = (() => {
  if (typeof window === 'undefined') {
    global.TestRun = TestRun
    global.runTest = runTest
    global.window = {}
    window.__ASSERT__ = true
    window.__DEBUG__ = true
    window.__DEVELOPMENT__ = true
  }

  TestRun.welcome()
})()
