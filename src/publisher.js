import publisher_create from './publisher_create'

export function Publisher(name,system) {
  this.name = name
  this.system(system)
}

function system(sys) {
  if (sys === undefined) return this._system
  this._system = sys
  return this
}

function producer(pro) {
  var create = publisher_create.bind(this._system)
  create(this.name, pro)

  return this
}

Publisher.prototype = {
  system: system,
  producer: producer
}

function publisher(name) {
  return new Publisher(name, this)
}

export default publisher;
