import express from 'express';
import path from 'path';
import authRoutes from './authRoutes';

export default () => {
  const router = express.Router();

  router.get('/', function(req, res) {
    res.sendFile(path.join('C:\\github\\folks-gaming-web-app\/dist' + '/index.html'));
  });

  router.use('/auth', authRoutes());

  return router;
};