import MessagePublisher from './MessagePublisher';
import config from '../../config';

export default new MessagePublisher(config.mq);