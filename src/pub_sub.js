import publisher_create from "./publisher_create"
import publisher_run from "./publisher_run"

import subscribe_add from "./subscribe_add"
import {subscribe_dispatchers, unsubscribe_dispatchers} from "./subscribe_dispatchers"


function pub_sub(){}

pub_sub.prototype.dispatchers = {}
pub_sub.prototype.publishers = {}
pub_sub.prototype.publisher_raw = {}


pub_sub.prototype.dispatch_subscription_name = function(dispath_name,subscription_name) {
  return dispatch_name + "." + subscription_name
}

pub_sub.prototype.run_publishers = publisher_run
pub_sub.prototype.create_publisher = publisher_create
pub_sub.prototype.add_subscriber = subscribe_add
pub_sub.prototype.subscribe_dispatchers = subscribe_dispatchers
pub_sub.prototype.unsubscribe_dispatchers = unsubscribe_dispatchers




export default pub_sub;
