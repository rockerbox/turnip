function locked_function(request, callback, name){
  return new LockedFunction(request, callback, name)
}

/**
 * Adds a lock to a `request` function so that it can only be called once.
 * @param {function} request - function from which to get data
 * @param {function} callback - event to trigger with data
 * @param {string} name - name of the event used for logging
 */
function LockedFunction(request, callback, name) {

  var self = this;

  self.lock = false;
  self.cancelled = false;

  self.cancel = function() {
    self.cancelled = true
  }

  self.callback = function(data) {
    self.lock = false 
    (!self.cancelled) ? 
      callback(data || true) :
      false
  }

  self.call = function(data) {
    if (self.lock == false) { 
      self.lock = true
      self.request = request(self.callback,data)
    }
  }

}

locked_function.prototype = LockedFunction.prototype; // allow instanceof

export default locked_function;
