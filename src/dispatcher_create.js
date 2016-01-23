import d3 from 'd3'

/**
 * Creates a dispatcher for the provided name and
 * puts it onto the prototype change for the pubsub system
 * @param {string} name - the unique name for the dispatcher
 */
function make_bound_dispatcher(name) {

  var pubsub = this;

  pubsub.dispatchers[name] = d3.dispatch(name)  // create dispatcher for pub
  var event = pubsub.dispatchers[name][name]    // create event for dispatcher
  var bound = event.bind(pubsub.dispatchers[name],name) // bind event

  return bound
}

export default make_bound_dispatcher; 
