import locked_function from "./mutex"

/**
 * Creates a publisher from a `producer` function
 * @param {string} name - the unique name for the publisher
 * @param {function} producer - function that will respond with data
 */
function publisher_create(name,producer){

  var pubsub = this

  function make_bound_dispatcher(name) {

    pubsub.dispatchers[name] = d3.dispatch(name)  // create dispatcher for pub
    var event = pubsub.dispatchers[name][name]    // create event for dispatcher
    var bound = event.bind(subscribe.dispatchers[name],name) // bind event

    return bound
  }

  function make_locked_producer(request,callback,name) {
    return locked_function(request,callback,name)
  }

  var callback  = make_bound_dispatcher(name)
  var publisher = make_locked_producer(producer,callback,name)

  // make calling the publisher accesible
  pubsub.publishers[name] = publisher.call 
  pubsub.publisher_raw[name] = publisher

}

export default publisher_create;
