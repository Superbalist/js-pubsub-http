'use strict';

let pubsub = require('@google-cloud/pubsub');
let GoogleCloudPubSubAdapter = require('@superbalist/js-pubsub-google-cloud');
let HTTPPubSubAdapter = require('../src/HTTPPubSubAdapter');

process.env.GOOGLE_APPLICATION_CREDENTIALS = '/usr/src/app/examples/your-gcloud-key.json';

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
