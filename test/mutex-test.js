var test = require('tape'),
  d3 = require('d3'),
  mutex = require('../').mutex

test('test mutex with no_delay', function (t) {
    t.plan(6)

    var DATA = "hello";

    var locked = mutex(
      function(callback) {
        t.equal(locked.lock, true,"lock present because in sequence")
        callback(DATA)
      },
      function(x) {
        t.equal(DATA,x)
      },
      "no_delay"
    )

    locked.call()
    t.equal(locked.lock, false,"no lock because no delay")


    var locked = mutex(
      function(callback,data) {
        t.equal(arguments.length,2,"check arguments when data is present")
        callback(data)
      },
      function(x) {
        t.equal(DATA,x)
      },
      "no_delay"
    )

    locked.call(DATA)
    t.equal(locked.lock, false,"no lock because no delay")

});


test('test mutex with delay', function (t) {
    t.plan(5)

    var DATA = "hello";

    var locked = mutex(
      function(callback,data) {
        t.equal(locked.lock, true,"lock present because in sequence")
        setTimeout(callback,1,data)
      },
      function(x) {
        t.equal(DATA,x)
        t.equal(locked.lock, false,"lock released because function complete")
      },
      "with_delay"
    )

    locked.call(DATA)
    t.equal(locked.lock, true,"lock because async function")
    setTimeout(function() {
      t.equal(locked.lock, false,"lock has been released")
    },1)

});

