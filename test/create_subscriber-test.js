var test = require('tape'),
  d3 = require('d3'),
  module = require('../'),
  pub_sub = require('../');

function buildSetup() {}

test('test subscriber creation', function (t) {
  t.plan(3)

  var system = {
    dispatchers: {
      "subscript_1": {
        on: function(){}
      }
    }
  } 
  var subscriber = new pub_sub.Subscriber("name", ["subscript_1"], system)

  t.equal(subscriber.system(), system)
  t.equal(subscriber.subscriptions[0],"subscript_1")
  t.equal(subscriber.name,"name")

})

test('test subscriber run and persistence of subscription', function (t) {

  t.plan(3)

  var DATA = 1;

  var to_register = function(dname,callback) {
    return function() { 
      callback(dname.split(".")[0], DATA)
    }
  }

  var fake_publisher;

  var system = {
    dispatchers: {
      "subscript_1": { on: function(dname,callback){
          fake_publisher = to_register(dname, callback)
        }
      }
    }
  } 
  var subscriber = new pub_sub.Subscriber("name", ["subscript_1"], system)


  subscriber.run(function(x){
    t.equal(x,DATA, "we got the anticipated data")
  })

  fake_publisher()
  fake_publisher()
  fake_publisher()

})

test('test subscriber changing callback', function (t) {

  t.plan(2)

  var DATA = 1;

  var to_register = function(dname,callback) {
    return function() { 
      callback(dname.split(".")[0], DATA)
    }
  }

  var fake_publisher;

  var system = {
    dispatchers: {
      "subscript_1": { on: function(dname,callback){
          fake_publisher = to_register(dname, callback)
        }
      }
    }
  } 
  var subscriber = new pub_sub.Subscriber("name", ["subscript_1"], system)


  subscriber.run(function(x){
    t.equal(x,DATA, "we got the anticipated data")
  })

  fake_publisher()

  subscriber.run(function(x){
    t.equal(x,DATA, "we got the anticipated data within a different func")
  })
  fake_publisher()

})


test('test subscriber unpersist', function (t) {

  t.plan(2)

  var DATA = 1;

  var to_register = function(dname,callback) {
    return function() { 
      callback(dname.split(".")[0], DATA)
    }
  }

  var fake_publisher;

  var system = {
    dispatchers: {
      "subscript_1": { on: function(dname,callback){
          fake_publisher = to_register(dname, callback)
        }
      }
    }
  } 
  var subscriber = new pub_sub.Subscriber("name", ["subscript_1"], system)


  subscriber.run(function(x){
    t.equal(x,DATA, "we got the anticipated data once")
  })


  subscriber.unpersist(true)
  fake_publisher()
  
  t.throws(function() {
    fake_publisher()
  })

})

test('test subscriber multi subscription with unpersist', function (t) {

  t.plan(4)

  var DATA = 1;

  var to_register = function(dname,callback) {
    return function() { 
      callback(dname.split(".")[0], DATA)
    }
  }

  var fake_publisher_1, fake_publisher_2;

  var system = {
    dispatchers: {
      "subscript_1": { on: function(dname,callback){
          fake_publisher_1 = to_register(dname, callback)
        }
      },
      "subscript_2": { on: function(dname,callback){
          fake_publisher_2 = to_register(dname, callback)
        }
      }
    }
  } 
  var subscriber = new pub_sub.Subscriber("name", ["subscript_1","subscript_2"], system)


  subscriber.run(function(x,y){
    t.equal(arguments.length,2)
    t.equal(x,DATA, "we got the anticipated data once")
  })


  subscriber.unpersist(true)
  fake_publisher_1()
  fake_publisher_2()

  t.throws(function() {
    fake_publisher_1()
  },"should not respond to publisher 1 being fired")

  t.throws(function() {
    fake_publisher_2()
  },"should not respond to publisher 2 being fired")

})

test('test subscriber multi subscription with persistence', function (t) {

  t.plan(6)

  var DATA = 1,
    DATA_2 = 1;

  var to_register = function(dname,callback) {
    return function(d) { 
      callback(dname.split(".")[0], d)
    }
  }

  var fake_publisher_1, fake_publisher_2;

  var system = {
    dispatchers: {
      "subscript_1": { on: function(dname,callback){
          fake_publisher_1 = to_register(dname, callback)
        }
      },
      "subscript_2": { on: function(dname,callback){
          fake_publisher_2 = to_register(dname, callback)
        }
      }
    }
  } 
  var subscriber = new pub_sub.Subscriber("name", ["subscript_1","subscript_2"], system)


  subscriber.run(function(x,y){
    t.equal(arguments.length,2)
    t.equal(x,DATA, "we got the anticipated data once")
    t.equal(y,DATA_2)
  })

  fake_publisher_1(DATA)
  fake_publisher_2(DATA_2)
  DATA_2 = 3;
  fake_publisher_2(DATA_2)

})

test('test subscriber multi subscription change callback', function (t) {

  t.plan(6)

  var DATA = 1,
    DATA_2 = 1;

  var to_register = function(dname,callback) {
    return function(d) { 
      callback(dname.split(".")[0], d)
    }
  }

  var fake_publisher_1, fake_publisher_2;

  var system = {
    dispatchers: {
      "subscript_1": { on: function(dname,callback){
          fake_publisher_1 = to_register(dname, callback)
        }
      },
      "subscript_2": { on: function(dname,callback){
          fake_publisher_2 = to_register(dname, callback)
        }
      }
    }
  } 
  var subscriber = new pub_sub.Subscriber("name", ["subscript_1","subscript_2"], system)


  subscriber.run(function(x,y){
    t.equal(arguments.length,2)
    t.equal(x,DATA, "we got the anticipated data once")
    t.equal(y,DATA_2)
  })

  fake_publisher_1(DATA)
  fake_publisher_2(DATA_2)

  subscriber.run(function(x,y){
    t.equal(arguments.length,2)
    t.equal(x,DATA, "we got the anticipated data once with a different callback")
    t.equal(y,DATA_2)
  })

  DATA_2 = 3;
  // NOTE: both need to fire again after updating the callback
  // not sure if this is the right API but we are swapping out the hash that collects the data
  // when we submit a new run function
  fake_publisher_1(DATA)
  fake_publisher_2(DATA_2)

})
