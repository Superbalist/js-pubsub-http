# @superbalist/js-pubsub-http

An HTTP adapter for the [js-pubsub](https://github.com/Superbalist/js-pubsub) package.

[![Author](http://img.shields.io/badge/author-@superbalist-blue.svg?style=flat-square)](https://twitter.com/superbalist)
[![Build Status](https://img.shields.io/travis/Superbalist/js-pubsub-http/master.svg?style=flat-square)](https://travis-ci.org/Superbalist/js-pubsub-http)
[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE)
[![NPM Version](https://img.shields.io/npm/v/@superbalist/js-pubsub-http.svg)](https://www.npmjs.com/package/@superbalist/js-pubsub-http)
[![NPM Downloads](https://img.shields.io/npm/dt/@superbalist/js-pubsub-http.svg)](https://www.npmjs.com/package/@superbalist/js-pubsub-http)

This adapter assumes that you have a HTTP service which accepts an array of messages POSTed to a
/messages/(channel) end-point.

## Installation

```bash
npm install @superbalist/js-pubsub-http
```
    
## Usage
```node
'use strict';

let pubsub = require('@google-cloud/pubsub');
let GoogleCloudPubSubAdapter = require('@superbalist/js-pubsub-google-cloud');
let HTTPPubSubAdapter = require('@superbalist/js-pubsub-http');

process.env.GOOGLE_APPLICATION_CREDENTIALS = '/path/to/your-gcloud-key.json';

// create the underlying adapter which is going to be decorated
let client = pubsub({
  projectId: 'your-project-id-here',
});

let googleCloudAdapter = new GoogleCloudPubSubAdapter(client);

// now create our decorator
// the decorator will proxy subscribe calls straight to the googleCloudAdapter
// publish calls will be POSTed to the service uri
let adapter = new HTTPPubSubAdapter('http://127.0.0.1', googleCloudAdapter);

adapter.subscribe('my_channel', (message) => {
  console.log(message);
  console.log(typeof message);
});

// consume messages
// note: this is a blocking call
adapter.subscribe('my_channel', (message) => {
  console.log(message);
  console.log(typeof message);
});

// publish messages
adapter.publish('my_channel', {first_name: 'Matthew'});
adapter.publish('my_channel', 'Hello World');

// publish multiple messages
let messages = [
  'message 1',
  'message 2',
];
adapter.publishBatch('my_channel', messages);
```

## TODO

* Add unit tests

## Examples

The library comes with [examples](examples) for the adapter and a [Dockerfile](Dockerfile) for
running the example scripts.

Run `make up`.

You will start at a `bash` prompt in the `/usr/src/app` directory.

If you need another shell to publish a message to a blocking consumer, you can run `docker-compose run js-pubsub-http /bin/bash`

To run the examples:
```bash
$ ./run_consumer.sh
$ ./run_publisher.sh (in a separate shell)
```
