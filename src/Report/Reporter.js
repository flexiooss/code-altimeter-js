const TestError = require('../runner/TestError')

class Reporter {
  /**
   *
   * @param {Report} report
   * @param {TestRun} runner
   */
  constructor(report, runner) {
    /**
     *
     * @params {Report}
     * @private
     */
    this.__report = report
    /**
     *
     * @params {TestRun}
     * @private
     */
    this.__runner = runner
  }

  /**
   *
   * @return {boolean}
   * @private
   */
  __hasError() {
    return this.__report.testFail > 0
  }

  show() {
    console.log('\x1b[46m%s\x1b[0m',
      `
    
       ################## 
      #  TESTS REPORT  # 
     ################## 
`)
    this.__report.logReport()
    this.__illustrate()
      .throw()
    return this
  }

  /**
   *
   * @return {Reporter}
   * @private
   */
  __illustrate() {
    if (this.__runner.isVerbose()) {
      if (this.__report.failed()) {
        console.log('\x1b[31m%s\x1b[0m', `88888888888888888888888  TEST FAIL  888888888888888888888888   
888888888888888888888888888888888888888888888888888888888888
888888888888888888888888888888888888888888888888888888888888
8888888888888888888888888P""  ""9888888888888888888888888888
8888888888888888P"88888P          988888"9888888888888888888
8888888888888888  "9888            888P"  888888888888888888
888888888888888888bo "9  d8o  o8b  P" od88888888888888888888
888888888888888888888bob 98"  "8P dod88888888888888888888888
888888888888888888888888    db    88888888888888888888888888
88888888888888888888888888      8888888888888888888888888888
88888888888888888888888P"9bo  odP"98888888888888888888888888
88888888888888888888P" od88888888bo "98888888888888888888888
888888888888888888   d88888888888888b   88888888888888888888
8888888888888888888oo8888888888888888oo888888888888888888888
888888888888888888888888888888888888888888888888888888888888

`)
      } else {
        console.log('\x1b[92m%s\x1b[0m', `
           |
        __| |__ 
      (=========)
      |=========|
      |====_====|
      |== / \\ ==|
      |= / _ \\ =|
   _  |=| ( ) |=|
  /=\\ |=|     |=| /=\\
  |=| |=| --- |=| |=|
  |=| |=|  _  |=| |=|
  |=| |=|  |  |=| |=|
  |=| |=|  |  |=| |=|
  |=| |=|  |  |=| |=|
  |=| |/   |   \\| |=|
  |=|/     |     \\|=|
  |=/    FLEXIO   \\=|
  |(_______________)|
  |=| |_|__|__|_| |=|
  |=|   ( ) ( )   |=|
 /===\\           /===\\
|||||||         |||||||
-------         -------
 (~~~)           (~~~)
 
 `)
      }
    }
    return this
  }

  /**
   * @throws TestError
   */
  throw() {
    if (this.__report.failed()) {
      throw new TestError('TEST FAILED : AHHHHHHHHHHHHHHHHHHHHHHHH !!! ')
    }
  }
}

module.exports = Reporter
