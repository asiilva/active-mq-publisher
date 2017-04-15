import publisher from '../publisher';
import logger from '../util/logger';

export default class AuthController {
  constructor() {
    this.messagePublisher = publisher;
  }

  persist(userId) {
    return new Promise((resolve, reject) => {
      var user = {
        steamUserId: userId
      };

      this.messagePublisher.publish('newUser', JSON.stringify(user))
        .then(resolve)
        .catch(reject);
    });
  }
}