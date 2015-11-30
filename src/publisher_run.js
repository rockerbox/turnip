/**
 * Runs the publishers associated with a list of dispatchers
 * @param {string} name - the unique name for the publisher
 * @param {function} producer - function that will respond with data
 */
function publisher_run(dispatchers,data) {

  var self = this;

  dispatchers.map(function(dispatch_name){
    self.publishers[name](data)
  })
}

export default publisher_run;
