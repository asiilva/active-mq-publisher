import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import { INTERNAL_SERVER_ERROR } from 'http-status';
import { ValidationError } from 'express-validation';
import routes from './routes';
import logger from './util/logger';
import cors from 'cors';

export default class Server {
  constructor(config) {
    this.port = config.server.port;
    this.app = express();
    this.app.server = http.createServer(this.app);
    this.app.use(bodyParser.json());
    this.app.use(cors());
    this.app.use(routes());
    this.app.use(express.static('public'))

    this.app.use((err, req, res, next) => {
      if (err instanceof ValidationError) {
        res.status(err.status).json(err.errors);
      } else {
        next(err);
      }
    });

    this.app.use((err, req, res, next) => {
      logger.error(err.message);
      res.status(INTERNAL_SERVER_ERROR).json({ message: err.message });
      next();
    });
  }

  start() {
    return new Promise((resolve, reject) => {
      this.app.listen(this.port)
        .on('listening', resolve)
        .on('error', reject);
    });
  }
  
  stop() {
    this.app.server.close();
  }
}