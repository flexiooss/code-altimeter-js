const lib = require('../../../index')
const assert = require('assert')

class AsyncBrokenTest extends lib.TestCase {


  async asyncTestWhoFail() {
    assert(false, 'Oups it\'s broken 1')
  }

  async asyncTestWhoFail2() {
    return new Promise((resolve, reject) => {
      setTimeout(()=>{
      assert(false, 'Oups it\'s broken 2')
      },2000)
    })
  }

  async asyncTestWhoFail3() {
    return new Promise((resolve, reject) => {
      setTimeout(()=>{
      reject('boum 3')
      },2000)

    })
  }

  async asyncTestWhoFail4() {
    return new Promise((resolve, reject) => {
      assert.doesNotReject(async()=>{
        setTimeout(()=>{
      reject('boum 4')

        },2000)
      })
    })
  }
  async asyncTestWhoFail5() {
    return new Promise((resolve, reject) => {
      assert.doesNotReject(async()=>{
        setTimeout(()=>{
          assert(false, 'Oups it\'s broken 5')
        },2000)
      })
    })
  }

}

module.exports = AsyncBrokenTest
