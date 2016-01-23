import locked_function from "./mutex"
import create_dispatcher from "./dispatcher_create"

/**
 * Creates a publisher from a `producer` function
 * @param {string} name - the unique name for the publisher
 * @param {function} producer - function that will respond with data
 */
function publisher_create(name,producer){

  var pubsub = this;

  var callback  = create_dispatcher.bind(pubsub)(name)
  var publisher = locked_function(producer.bind(pubsub),callback,name)

  // make calling the publisher accesible
  pubsub.publishers[name] = publisher.call
  pubsub.publisher_raw[name] = publisher

}

export default publisher_create;
