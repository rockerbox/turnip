var test = require('tape'),
  d3 = require('d3'),
  module = require('../'),
  pub_sub = require('../').pub_sub;

function buildSetup() {}

test('test publisher creation', function (t) {
  t.plan(2)

  var proto_mock = {
    dispatchers: {},
    publishers: {},
    publisher_raw: {}
  }

  var create = pub_sub.prototype.create_publisher.bind(proto_mock)

  create("NAME",function(callback) { return  })

  var publisher = proto_mock.publishers["NAME"],
    publisher_raw = proto_mock.publisher_raw["NAME"];

  t.equal(typeof publisher, typeof module.mutex, "check existence")
  t.equal(publisher_raw instanceof module.mutex, true, "check type of publisher")

})

test('test publisher execution', function (t) {
  t.plan(2)

  var proto_mock = {
    dispatchers: {},
    publishers: {},
    publisher_raw: {}
  }

  var create = pub_sub.prototype.create_publisher.bind(proto_mock)

  create("NAME",function(callback) {
    setTimeout(callback,1,true)
  })

  var publisher = proto_mock.publishers["NAME"],
    publisher_raw = proto_mock.publisher_raw["NAME"];

  publisher()

  t.equal(publisher_raw.lock,true, "check mutex is locked")

  setTimeout(function(){
    t.equal(publisher_raw.lock,false, "check mutex is unlocked")
  },1)

})

test('test publisher execution with data', function (t) {
  t.plan(3)

  var proto_mock = {
    dispatchers: {},
    publishers: {},
    publisher_raw: {}
  }

  var create = pub_sub.prototype.create_publisher.bind(proto_mock)


  create("NAME",function(callback,data) {
    t.equal(arguments.length, 2, "multiple arguments")
    t.equal(data, "data","data is passed to publisher")
    setTimeout(callback,1,true)
  })

  var publisher = proto_mock.publishers["NAME"],
    publisher_raw = proto_mock.publisher_raw["NAME"];

  publisher("data")


  setTimeout(function(){
    t.equal(publisher_raw.lock,false)
  },1)

});

