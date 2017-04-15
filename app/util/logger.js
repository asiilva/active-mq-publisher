import winston from 'winston';
import config from '../../config';

const logger = new winston.Logger(config.log);

export default logger;