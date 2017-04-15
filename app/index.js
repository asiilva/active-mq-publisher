import config from '../config';
import Server from './Server';
import logger from './util/logger';

config.server.port = process.env.PORT || config.server.port;
const server = new Server(config);

server.start()
logger.info(`Servidor iniciado na porta: ${config.server.port}`)