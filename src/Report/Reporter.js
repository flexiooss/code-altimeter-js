const TestError = require('../TestError')

class Reporter {
  /**
   *
   * @param {Report} report
   */
  constructor(report) {
    /**
     *
     * @type {Report}
     * @private
     */
    this.__report = report
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
    console.log('\x1b[46m%s\x1b[0m',`
    
   ############ 
  #  REPORT  # 
 ############ 
`)
    this.__report.logReport()
    this.__illustrate()
      .throw()
    // if (this.__hasError()) {
    //   if (this.__report. > 0) {
    //     console.log(`TestCase Pass : ${this.__testCasePass} / ${this.__testCaseCount} `)
    //   }
    //   console.log(`Tests Pass : ${this.__testPass} / ${this.__testCount} `)
    //
    //   if (this.__testCaseCount > 0) {
    //     console.log(`TestCase Fail : ${this.__testCaseFail} / ${this.__testCaseCount} `)
    //   }
    //   console.log('\x1b[41m\x1b[30m%s\x1b[0m', ` Fail : ${this.__testFail} / ${this.__testCount()} `)
    //
    // } else {
    //   if (this.__testCaseCount > 0) {
    //     console.log('\x1b[102m\x1b[30m%s\x1b[0m', ` TestCase Pass : ${this.__testCasePass} / ${this.__testCaseCount} `)
    //   }
    //   console.log('\x1b[102m\x1b[30m%s\x1b[0m', ` Tests Pass : ${this.__testPass} / ${this.__testCount} `)
    //
    // }
    return this
  }

  /**
   *
   * @return {Reporter}
   * @private
   */
  __illustrate() {
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
    return this
  }

  /**
   * @throws TestError
   */
  throw() {
    if (this.__report.failed()) {
      throw new TestError('TEST FAILED')
    }
  }
}

module.exports = Reporter
