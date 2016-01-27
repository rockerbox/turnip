var test = require('tape'),
  d3 = require('d3'),
  s = require('../');

test('test system creation', function (t) {
  t.plan(4)

  var Publisher = s.Publisher, 
    Subscriber = s.Subscriber;

  var sys = new s.system()

  var pub = sys.publisher()
  var sub = sys.subscriber()

  var pub_sub = pub_sub;

  t.true(pub instanceof Publisher, "is publisher")
  t.true(sub instanceof Subscriber, "is subscriber")

  t.equal(pub.system(), sys)
  t.equal(sub.system(), sys)

});

test('test system synchronos publisher', function (t) {
  t.plan(3)

  var sys = new s.system()

  var pub = sys.publisher("pub_1")
    .producer(function(callback,input_data_1,input_data_2){
      callback({"data": "ok"})
    })

  var synchronousValue = 0

  var sub = sys.subscriber("sub_1",["pub_1"])
    .run(function(pub_1_data){
      t.equal(pub_1_data.data,"ok")
      t.equal(arguments.length,1)
      synchronousValue = 1
    })

  sub.trigger()
  t.equal(synchronousValue,1)
})

test('test system synchronos publisher with data', function (t) {
  t.plan(4)

  var sys = new s.system()

  var pub = sys.publisher("pub_1")
    .producer(function(callback,data){
      t.equal(arguments.length,2,"received array of data")
      callback({"data":data})
    })

  var DATA = ["asdf", "asadfff"]
  var synchronousValue = 0

  var sub = sys.subscriber("sub_1",["pub_1"])
    .run(function(pub_1_data){
      t.equal(pub_1_data.data,DATA,"correct data flows through")
      t.equal(arguments.length,1,"correct number of args from publisher")
      synchronousValue = 1
    })
    .data(DATA)

  sub.trigger()
  t.equal(synchronousValue,1,"is synchronous because callback updated value")


})

test('test system synchronos publisher with multiple pieces of data', function (t) {
  t.plan(4)

  var sys = new s.system()

  var pub = sys.publisher("pub_1")
    .producer(function(callback,data_1, data_2){
      t.equal(arguments.length,3,"received array of data")
      callback({"data":[data_1,data_2]})
    })

  var DATA = ["asdf", "asadfff"]
  var synchronousValue = 0

  var sub = sys.subscriber("sub_1",["pub_1"])
    .run(function(pub_1_data){
      t.deepEqual(pub_1_data.data,DATA,"correct data flows through")
      t.equal(arguments.length,1,"correct number of args from publisher")
      synchronousValue = 1
    })
    .data(DATA[0],DATA[1])

  sub.trigger()
  t.equal(synchronousValue,1,"is synchronous because callback updated value")


})
test('test system asynchronous publisher with data', function (t) {
  t.plan(5)

  var sys = new s.system()

  var pub = sys.publisher("pub_1")
    .producer(function(callback,data_1, data_2){
      t.equal(arguments.length,3,"received array of data")
      setTimeout(callback,1,{"data":[data_1,data_2]})
    })

  var DATA = ["asdf", "asadfff"]
  var synchronousValue = 0

  var sub = sys.subscriber("sub_1",["pub_1"])
    .run(function(pub_1_data){
      t.deepEqual(pub_1_data.data,DATA,"correct data flows through")
      t.equal(arguments.length,1,"correct number of args from publisher")
      t.equal(synchronousValue,1,"prove it is synchronous")

    })
    .data(DATA[0],DATA[1])

  sub.trigger()
  t.equal(synchronousValue,0,"make sure it is asynchronous ")
  synchronousValue = 1
  


})


test('test system multi-subscription to publishers', function (t) {
  t.plan(5)

  var sys = new s.system()

  var pub = sys.publisher("pub_1")
    .producer(function(callback,data){
      t.equal(arguments.length,2, "publisher is provided with data")
      setTimeout(callback,1,{"data":data})
    })

  var DATA = "hello"

  var pub = sys.publisher("pub_2")
    .producer(function(callback,data){
      t.equal(arguments.length,2, "publisher is provided with data")
      setTimeout(callback,1,{"data":data + "2"})
    })

  var sub = sys.subscriber("sub_1",["pub_1","pub_2"])
    .run(function(pub_1_data,pub_2_data){
      t.equal(pub_1_data.data,DATA, "subscriber received data from publisher")
      t.equal(pub_2_data.data,DATA + "2", "subscriber received data from publisher")
      t.equal(arguments.length,2,"right number of arguments")

    })
    .data(DATA)

  sub.trigger()

})


test('test system persistent subscriber', function (t) {
  t.plan(3)

  var sys = new s.system()

  var pub = sys.publisher("pub_1")
    .producer(function(callback,data_1){
      setTimeout(callback,1,{"data":data_1})
    })

  var DATA = "asdf"

  var sub = sys.subscriber("sub_1",["pub_1"])
    .run(function(pub_1_data){
      t.equal(pub_1_data.data,DATA,"correct data flows through")
    })
    .data(DATA)

  sub.trigger()
  setTimeout(function(){sub.trigger()},1)

  t.equal(1,1)
  


})

test('test system unpersistent subscriber', function (t) {
  t.plan(2)

  var sys = new s.system()

  var pub = sys.publisher("pub_1")
    .producer(function(callback,data_1){
      setTimeout(callback,1,{"data":data_1})
    })

  var DATA = "asdf"

  var sub = sys.subscriber("sub_1",["pub_1"])
    .run(function(pub_1_data){
      t.equal(pub_1_data.data,DATA,"correct data flows through")
    })
    .data(DATA)
    .unpersist(true)

  sub.trigger()
  setTimeout(function(){sub.trigger()},1)

  t.equal(1,1)

})
