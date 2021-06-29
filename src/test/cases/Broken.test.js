const lib = require('../../../index')
const assert = require('assert')

class BrokenTest extends lib.TestCase {

  testWhoFail() {
    assert(false, "Oups it's broken")
  }

}
module.exports = BrokenTest
