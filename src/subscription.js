function subscription_hash(subscriptions,callback){
  return new SubscriptionHash(subscriptions,callback)
}

/**
 * A hash wrapper that waits until all keys have value before running callback
 * @param {string[]} subscriptions - 
 * @param {function} callback - event to trigger after all data is received
 */
function SubscriptionHash(subscriptions,callback) {

  var self = this;
  var sdata = {};

  subscriptions.map(function(s){return sdata[s] = null})

  self.add_data = function (name, data) {
    sdata[name] = data
  }

  self.has_data = function() {
    var keys = Object.keys(sdata)
    var num_present =  keys.filter(function(k) {return sdata[k] != null}).length 

    return num_present == subscriptions.length 
  }

  self.run_callback = function() {
    var arr = subscriptions.map(function(s){return sdata[s]})
    callback.apply(false,arr)
  }

  self.set = function(name,data) {
    self.add_data(name,data)
    
    self.has_data() ? 
      self.run_callback() :
      false
  }

  self.evaluate = self.set // deprecated... but aliasing for now
  
}

subscription_hash.prototype = SubscriptionHash.prototype; // allow instanceof

export default subscription_hash;
