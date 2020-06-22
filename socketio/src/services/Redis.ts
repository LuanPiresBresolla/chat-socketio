import Redis, { Redis as RedisClient } from 'ioredis';
import redisConfig from '../database/redisConnection';

export default class RedisCacheProvider {
  private client: RedisClient;

  constructor() {
    this.client = new Redis(redisConfig.config.redis);
  }

  public async save(key: string, value: any): Promise<any> {
    await this.client.set(key, value);  
  }

  public async recover<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key);

    if (!data) {
      return null;
    }

    const parsedData = JSON.parse(data) as T;

    return parsedData;
  }

  public async invalidate(key: string): Promise<void> {
    await this.client.del(key);
  }

  public async invalidatePrefix(prefix: string): Promise<void> {
    // buscando todas as chaves que começam com o valor de prefix
    const keys = await this.client.keys(`${prefix}:*`);

    // executar multiplas ações ao mesmo tempo
    const pipeline = this.client.pipeline();

    // Deletando todas as chaves
    keys.forEach(key => {
      pipeline.del(key);
    });

    // Executando o ForEach para deletar
    await pipeline.exec();
  }
}
