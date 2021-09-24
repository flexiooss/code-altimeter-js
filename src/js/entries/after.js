/* global TestRun */
const VERBOSE = process.env.TEST_VERBOSE === 1

module.exports = (() => {
  TestRun
    .withVerbose(VERBOSE)
    .run()
    .then((runner) => {
      runner.showReport()
        .ensureThrow()
    }).catch((e)=>{
    console.error(e)
    process.exit(1)
  })
})()