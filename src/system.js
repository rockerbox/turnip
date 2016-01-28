import publisher from './publisher'
import subscriber from './subscriber'
import publisher_run from "./publisher_run"


function system() {

}



system.prototype.dispatchers = {}
system.prototype.publishers = {}

system.prototype.publisher_raw = {}

system.prototype.subscriber = subscriber;
system.prototype.publisher = publisher;

system.prototype.run_publishers = publisher_run


export default system;
