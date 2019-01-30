const TestError = require('./TestError')
const {TEST_METHOD_PREFIX} = require('./constantes')
const VERBOSE = process.env.TEST_VERBOSE === 1

module.exports = class TestExecutor {
  /**
   *
   * @param {TestCase} test
   */
  constructor(test) {
    /**
     *
     * @type {TestCase}
     * @private
     */
    this.__test = test
    /**
     *
     * @type {Array<string>}
     * @private
     */
    this.__testsList = []

    /**
     *
     * @type {number}
     * @private
     */
    this.__testsPass = 0
    /**
     *
     * @type {number}
     * @private
     */
    this.__testsFail = 0
    /**
     *
     * @type {boolean}
     * @private
     */
    this.__error = false
  }

  exec() {
    this.__invokeBeforeClass()
      .__updateTestsList()
      .__runTests()
      .__invokeAfterClass()
  }

  /**
   *
   * @return {TestExecutor}
   * @private
   */
  __invokeBeforeClass() {
    this.__test.constructor.beforeClass()
    if (VERBOSE) {
      console.log(`
    
------------------------------------------------------
Start ${this.__test.constructor.name} `)
    }
    return this
  }

  /**
   *
   * @return {TestExecutor}
   * @private
   */
  __runTests() {
    /**
     * @type {Array<string>} tests
     */
    this.__testsList.forEach((v) => {
      if (VERBOSE) {
        console.log(`------------------------------------------------------
Setup ${v} 
`)
      }
      this.__test.setUp()
      if (VERBOSE) {
        console.log(`Test  ${v}`)
      }
      try {
        this.__test[v]()
        if (VERBOSE) {
          console.log(`Test pass ${v}`)
        }
        this.__incrementTestPass()
      } catch (e) {
        console.log(`
       
########################################        
###### TEST FAIL      ${this.__test.constructor.name}:${v}
########################################
`)
        console.log(e)
        console.log(`
########################################
`)
        this.__incrementTestFail()
        this.__error = true
      }
      if (VERBOSE) {
        console.log(`------------------------------------------------------
tearDown ${v} 
`)
      }
      this.__test.tearDown()
    })
    return this
  }

  /**
   *
   * @return {TestExecutor}
   * @private
   */
  __updateTestsList() {
    this.__testsList.push(...this.__getInstanceMethodNames(this.__test)
      .filter((v) => {
        return v.startsWith(TEST_METHOD_PREFIX)
      }))
    return this
  }

  /**
   *
   * @return {number}
   * @private
   */
  __testsCount() {
    return this.__testsList.length
  }

  /**
   *
   * @return {TestExecutor}
   * @private
   */
  __incrementTestPass() {
    this.__testsPass++
    return this
  }

  /**
   *
   * @return {TestExecutor}
   * @private
   */
  __incrementTestFail() {
    this.__testsFail++
    return this
  }

  /**
   *
   * @param {TestCase} obj
   * @param stop
   * @return {Array<string>}
   * @private
   */
  __getInstanceMethodNames(obj, stop) {
    let array = []
    let proto = Object.getPrototypeOf(obj)
    while (proto && proto !== stop) {
      Object.getOwnPropertyNames(proto)
        .forEach(name => {
          if (name !== 'constructor') {
            if (this.__hasMethod(proto, name)) {
              array.push(name)
            }
          }
        })
      proto = Object.getPrototypeOf(proto)
    }
    return array
  }

  /**
   *
   * @param {Object} obj
   * @param {string} name
   * @return {boolean}
   * @private
   */
  __hasMethod(obj, name) {
    const desc = Object.getOwnPropertyDescriptor(obj, name)
    return !!desc && typeof desc.value === 'function'
  }

  /**
   *
   * @return {TestExecutor}
   * @private
   */
  __invokeAfterClass() {
    this.__test.constructor.afterClass()
    if (VERBOSE) {
      console.log(`------------------------------------------------------
Finish ${this.__test.constructor.name} 
`)
    }

    console.log(`
------------------------------------------------------
  ############
 #  REPORT  #
############
# Test case : ${this.__test.constructor.name}`)

    if (this.__error) {
      console.log(` Pass : ${this.__testsPass} / ${this.__testsCount()} `)
      console.log('\x1b[41m\x1b[30m%s\x1b[0m', `Fail : ${this.__testsFail} / ${this.__testsCount()}`)
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
888888888888888888888888888888888888888888888888888888888888`)
      throw new TestError('TEST FAILED')
    } else {
      console.log('\x1b[102m\x1b[30m%s\x1b[0m', `Pass : ${this.__testsPass} / ${this.__testsCount()}`)
      console.log('\x1b[92m%s\x1b[0m', `        _______ 
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
 (~~~)           (~~~)`)
    }
    return this
  }
}
