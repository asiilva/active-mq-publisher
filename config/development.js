import winston from 'winston';

export default {
  server: {
    port: 7000
  },
  mq: {
    server: {
      host: '127.0.0.1',
      port: 61613
    },
    queues: {
      newUser: {
        name: '/topic/usuario-steam',
        contentType: 'application/json'
      }
    }
  },
  log: {
    transports: [
      new (winston.transports.Console)({
        timestamp: () => (new Date()).toLocaleTimeString(),
        colorize: true
      })
    ]
  }
};