import stompit from 'stompit';

export default class MessagePublisher {
  constructor(config) {
    this.config = config;
    const manager = new stompit.ConnectFailover([config.server], { maxReconnects: 10 });
    this.channelPool = new stompit.ChannelPool(manager);
  }

  publish(queue, message) {
    return new Promise((resolve, reject) => {
      this.channelPool.channel((error, channel) => {
        if (error) {
          reject(error);
        } else {
          const queueConfig = this.config.queues[queue];

          const headers = {
            destination: queueConfig.name,
            'content-type': queueConfig.contentType
          };

          channel.send(headers, message, (sendError) => {
            if (sendError) {
              return reject(sendError);
            }

            return resolve();
          });
        }
      });
    });
  }
}