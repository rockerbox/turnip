import subscribe_add from './subscribe_add'
import subscription_hash from './subscription'
import {subscribe_dispatchers, unsubscribe_dispatchers} from './subscribe_dispatchers'

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
  var args = arguments
  var arr = Object.keys(args).map(function(k){
    return args[k]
  })
  this._data = arguments.length > 1 ? arr : [bool]
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
    if (self._unpersist === true) self.destroy()
  }

  unsubscribe_dispatchers.bind(this._system)(this.subscriptions,this.name) 


  // TODO: move this to another function
  this.subscription = subscription_hash(
    this.subscriptions,
    this.callback
  )

  subscribe_dispatchers.bind(this._system)(
    this.subscriptions,
    this.name,
    this.subscription.set
  )

  return this
}

/* Methods */


function destroy() {
  unsubscribe_dispatchers.bind(this._system)(this.subscriptions,this.name) 
}

function trigger() {
  this._system.run_publishers(
    this.subscriptions,
    this._data
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

subscriber.prototype = Subscriber.prototype

export default subscriber;
