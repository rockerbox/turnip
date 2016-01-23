import subscribe_add from './subscribe_add'
import subscription_hash from './subscription'

export function Subscriber(name,subscriptions,system) {
  this.name = name
  this.subscriptions = subscriptions
  this.system(system)
}

/* Setting values */

function system(sys) {
  if (sys === undefined) return this._system
  this._system = sys
  return this
}

function data(bool) {
  if (bool === undefined) return this._data
  this._data = bool
  return this
}

function unpersist(bool) {
  if (bool === undefined) return this._unpersist
  this._unpersist = bool
  return this
}

function run(fn) {
  var self = this;

  this.callback = function() {
    fn.apply(self,arguments)
    if (self.unpersist) self.destroy()
  }

  this.subscription = subscription_hash(
    this.subscriptions,
    this.callback
  )

  this._system.subscribe_dispatchers(
    this.subscriptions,
    this.name,
    this.subscription.set
  )

  return this
}

/* Methods */


function destroy() {
  this._system.unsubscribe_dispatchers(this.subscriptions,this.name) 
}

function trigger() {
  this._system.run_publishers(
    this.subscriptions,
    this.data
  )
}

Subscriber.prototype = {
  system: system,
  data: data,
  unpersist: unpersist,
  run: run,
  trigger: trigger,
  destroy: destroy
}

function subscriber(name, subscriptions) {
  return new Subscriber(name, subscriptions, this)
}

export default subscriber;
