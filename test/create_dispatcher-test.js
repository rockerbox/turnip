var test = require('tape'),
  d3 = require('d3'),
  pub_sub = require('../').pub_sub;

function buildSetup() {
  return {
    create: pub_sub.prototype.create_dispatch,
    proto_mock: {
      dispatchers: {}
    }, 
    NAME: "NAME"
  }
}

test('test dispatcher creation', function (t) {
  t.plan(3)

  var setup = buildSetup(),
    create = setup.create,
    proto_mock = setup.proto_mock,
    NAME = setup.NAME;
  

  var bound = create.bind(proto_mock)(NAME),
    dispatch = proto_mock.dispatchers[NAME]


  dispatch.on(NAME, function(x) {
    t.equal(NAME != x, true)
    t.equal(x,"OTHER")
  })

  t.equal(typeof dispatch, typeof d3.dispatch(), "dispatch element was added to prototype chain")

  dispatch[NAME]("OTHER")

});


test('test dispatcher binding', function (t) {
  t.plan(4)

  var setup = buildSetup(),
    create = setup.create,
    proto_mock = setup.proto_mock,
    NAME = setup.NAME;

  var bound = create.bind(proto_mock)(NAME)
  var dispatch = proto_mock.dispatchers[NAME]

  dispatch.on(NAME, function(x) {
    t.equal(NAME,x, "the first element is the name of the event fired")
    t.equal(this,dispatch, "'this' is the dispatch")
  })

  dispatch[NAME](NAME)
  bound()

})

  
