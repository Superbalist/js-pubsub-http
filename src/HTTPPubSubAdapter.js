'use strict';

const axios = require('axios');

/**
 * @callback subscriberCallback
 * @param {*} message - The message payload received
 */

/**
 * HTTPPubSubAdapter Class
 *
 * @implements {module:@superbalist/js-pubsub.PubSubAdapterInterface}
 * @example
 * let pubsub = require('@google-cloud/pubsub');
 * let GoogleCloudPubSubAdapter = require('@superbalist/js-pubsub-google-cloud');
 * let HTTPPubSubAdapter = require('@superbalist/js-pubsub-http');
 *
 * let client = pubsub({
 *   projectId: 'your-project-id-here',
 * });
 *
 * let googleCloudAdapter = new GoogleCloudPubSubAdapter(client);
 *
 * let adapter = new HTTPPubSubAdapter('http://127.0.0.1', googleCloudAdapter);
 */
class HTTPPubSubAdapter {
  /**
   * Construct a HTTPPubSubAdapter
   *
   * @param {string} uri
   * @param {module:@superbalist/js-pubsub.PubSubAdapterInterface} adapter
   */
  constructor(uri, adapter) {
    /**
     * @type {string}
     */
    this.uri = uri;

    /**
     * @type {module:@superbalist/js-pubsub.PubSubAdapterInterface}
     */
    this.adapter = adapter;
  }

  /**
   * Subscribe a handler to a channel.
   *
   * @param {string} channel
   * @param {subscriberCallback} handler - The callback to run when a message is received
   * @example
   * adapter.subscribe('my_channel', (message) => {
   *   console.log(message);
   * });
   */
  subscribe(channel, handler) {
    this.adapter.subscribe(channel, handler);
  }

  /**
   * Publish a message to a channel.
   *
   * @param {string} channel
   * @param {*} message - The message payload
   * @return {Promise<*>}
   * @example
   * // publish a string
   * adapter.publish('my_channel', 'Hello World');
   *
   * // publish an object
   * adapter.publish('my_channel', {
   *   'id': 1234,
   *   'first_name': 'Matthew',
   * });
   */
  publish(channel, message) {
    const url = this.uri + '/messages/' + channel;
    const messages = message instanceof Array ? message : [message];
    return axios({
      method: 'POST',
      url,
      data: {
        messages,
      },
    });
  }

  /**
   * Publish multiple messages to a channel.
   *
   * @param {string} channel
   * @param {*[]} messages
   * @return {Promise<*>}
   * @example
   * let messages = [
   *   'message 1',
   *   'message 2',
   * ];
   * adapter.publishBatch('my_channel', messages);
   */
  publishBatch(channel, messages) {
    return this.publish(channel, messages);
  }
}

module.exports = HTTPPubSubAdapter;
