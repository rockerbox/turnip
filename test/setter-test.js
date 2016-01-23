var test = require('tape'),
  d3 = require('d3'),
  accessor = require('../').accessor,
  console = require('console')

test('test adding param to bound object', function (t) {
    t.plan(1)
    var x = {}
    accessor.bind(x)("asdf","VALUE")
    t.equal(x["_asdf"],"VALUE")
});

test('test retreiving param from bound object', function (t) {
    t.plan(1)
    var x = {"_asdf":"VALUE"}
    t.equal(accessor.bind(x)("asdf"),"VALUE")
});
