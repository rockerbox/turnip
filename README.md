## Turnip

Turnip is a publisher/subscribe library designed around the concept of UI components needing multipled pieces of data before they can be rendered or updated.

It is based off of d3.dispatch.

### How to use

var pubsub = new PubSubSystem()

#### Creating Publishers

```
pubsub.publisher("pub_name")
  .producer(function(cb){
	setTimeout(function(x){
	  callback({"some":"data"})
	},1000)
  })

pubsub.publisher("pub_name_with_data")
  .producer(function(cb,data){
	setTimeout(function(x){
	  callback({"some_transformed":data})
	},1000)
  })
```

### Creating Subscriptions

```
var subscription = pubsub.subscriber("name",["x","y"])

```
#### With data

```
pubsub.subscriber("name",["x","y"])
  .run(function(x,y){
  	
  })
  .data({"some":"data"})
  .unpersist(true)
  .trigger()

```
#### Without data

```
subscription
  .run(function(x,y){
  	
  })
  .data({"some":"data"})
  .unpersist(true)
  .trigger()

```

