import { RedisOptions } from 'ioredis';

interface ICacheConfig {
  config: {
    redis: RedisOptions;
  };
}

export default {
  config: {
    redis: {
      host: '127.0.0.1',
      port: 6379,
      password: '',
    },
  },
} as ICacheConfig;
