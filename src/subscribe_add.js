import subscription from "./subscription"

/**
 * Create subscriber that waits for data from publishers and executes callback
 * when all data has arrived.
 * @param {string[]} subscriptions - publishers to subscribe to
 * @param {function} callback - function to execute after all data is received
 * @param {string} name - name of the subscription
 * @param {boolean} trigger - execute publishers on load
 * @param {boolean} unpersist - remove the subscription after callback called
 * @param {} data - data to supply the publishers with while executing
 */
function subscribe_add(subscriptions,callback,name,trigger,unpersist,data) {

  var pubsub = this;

  function make_callback(name,callback,persist,subscriptions) {

    var cb = function () {
      callback.apply(false,arguments) 
      if (!persist) pubsub.unsubscribe_dispatchers(subscriptions,name)    
    }
    return cb
  }

  function make_subscription(subscriptions,cb) {
    return subscription_hash(subscriptions,cb)
  }


  var cb = make_callback(name,cb,!unpersist,subscriptions)
  var subscription = make_subscription(subscriptions,cb)
  var built = pubsub.subscribe_dispatchers(subscriptions,name,subscription.set)

  if (trigger) pubsub.run_publishers(subscriptions,data)

}
export default subscribe_add;
