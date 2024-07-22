import { Injectable } from '@nestjs/common';
import { AmqpConnection } from '@nestjs-plus/rabbitmq';
import { ElasticsearchService } from '../elasticsearch/elasticsearch.service';


/**
 * Service for handling logging.
 */
@Injectable()
export class LoggerService {
  constructor(
    private readonly elasticsearchService: ElasticsearchService,
    private readonly amqpConnection: AmqpConnection
  ) {}

  /**
   * Logs an event to the console and Elasticsearch.
   * @param event The event data to log.
   */
  async logEvent(event: any) {
    console.log('Event received:', event);
    await this.elasticsearchService.indexLog('task-logs', event);
  }
}
