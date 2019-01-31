class TestRun {
  constructor() {
    /**
     *
     * @type {Array}
     * @private
     */
    this.__testable = []
    this._report = new TestRunReport()
  }
  welcome() {
    console.log(`
###########################################################################
###########################################################################

               _              _ _   _                _            
              | |            | | | (_)              | |           
  ___ ___   __| | ___    __ _| | |_ _ _ __ ___   ___| |_ ___ _ __ 
 / __/ _ \\ / _\` |/ _ \\  / _\` | | __| | '_ \` _ \\ / _ \\ __/ _ \\ '__|
| (_| (_) | (_| |  __/ | (_| | | |_| | | | | | |  __/ ||  __/ |   
 \\___\\___/ \\__,_|\\___|  \\__,_|_|\\__|_|_| |_| |_|\\___|\\__\\___|_|   
                                                                  
  by Flexio
###########################################################################
`)
  }

  /**
   *
   * @return {TestRun}
   */
  start() {
    return this
  }

  /**
   *
   * @return {TestRun}
   */
  showReport() {
    console.log('fini')
    return this
  }

  /**
   * @throws {TestError}
   * @return {TestRun}
   */
  throw() {
    console.log('throw')
    return this
  }
}

const instance = new TestRun()
Object.freeze(instance)

module.exports = instance
