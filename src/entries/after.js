/* global TestRun */
const VERBOSE = process.env.TEST_VERBOSE === 1

module.exports = (() => {
  TestRun
    .withVerbose(VERBOSE)
    .start()
    .showReport()
    .throw()
})()
