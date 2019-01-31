const TestRun = require('../runner/TestRun')

module.exports = (() => {
  if (typeof window === 'undefined') {
    global.TestRun = TestRun
    global.runTest = (test) => {
      TestRun.addTest(test)
    }
    global.window = {}
    window.__ASSERT__ = true
    window.__DEBUG__ = true
    window.__DEVELOPMENT__ = true
  }

  TestRun.welcome()
})()
