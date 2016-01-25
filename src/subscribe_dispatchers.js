/**
 * Subscribes to a list dispatchers and executes the callback when 
 * each dispatcher finishes
 * @param {string[]} dispatchers - dispatchers to subscribe to 
 * @param {string} name - name of the subscription
 * @param {function} callback - function to execute after dispatcher fired
 */
export function subscribe_dispatchers(dispatchers,name,callback) {

  var pubsub = this;

  return dispatchers.map(function(dispatch_name){
    var dname = dispatch_subscription_name.bind(pubsub)(dispatch_name,name)
    return pubsub.dispatchers[dispatch_name].on(dname,callback) 
  })
}

export function unsubscribe_dispatchers(dispatchers,name) {

  var pubsub = this;

  return subscribe_dispatchers.bind(pubsub)(dispatchers,name,null)
}

export function dispatch_subscription_name(dispatch_name,subscription_name) {
  return dispatch_name + "." + subscription_name
}
