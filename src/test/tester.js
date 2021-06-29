const TestRun = require('../js/runner/TestRun')
const runTest = require('../js/runner/runTest')
const TestSuite = require('../js/Testable/TestSuite')
const BrokenTest = require('./cases/Broken.test')
const AsyncBroken = require('./cases/AsyncBroken.test')

if (typeof window === 'undefined') {
  global.TestRun = TestRun
  global.runTest = runTest
  global.window = {}
  window.__ASSERT__ = true
  window.__DEBUG__ = true
  window.__DEVELOPMENT__ = true
}

TestRun.welcome()
//runTest(BrokenTest)
//runTest(BrokenTest, 'testWhoFail')
runTest(AsyncBroken)
//runTest(AsyncBroken, 'asyncTestWhoFail')

//runTest(
//  TestSuite
//    //    .withTestCase(BrokenTest)
//    .withTestCase(AsyncBroken)
////    .addTestCase(AsyncBroken)
//)

;(() => {
  TestRun
    .withVerbose(false)
    .run().then((runner) => {
    runner.showReport()
      .ensureThrow()
  })

})()
