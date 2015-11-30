## Turnip

Turnip is a publisher/subscribe library designed around the concept of UI components needing multipled pieces of data before they can be rendered or updated.

It is based off of d3.dispatch.

### How to use

```
// Given a producer function that executes a callback when it receives data
// e.g., a blocking API call, a click event, etc

var producer_function = function(callback) {
  setTimeout(function(x){
    callback({"some":"data"})
  },1000)
}

var pubsub = pub_sub()


// We add these functions as publishers to our system
pubsub.create_publisher("api_get_advertiser",producer_function)

var subscription_callback = function(data) {
  // build advertiser module here...
  console.log(data)
}


// We can then subscribe to this publisher and execute a callback when all the data is received
pubsub.add_subscriber(["api_get_advertiser"],subscription_callback,"build_advertiser_module",true,true,false)


```
