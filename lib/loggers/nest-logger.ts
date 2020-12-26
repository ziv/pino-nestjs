import { Injectable, LoggerService } from '@nestjs/common';
import {Logger} from './logger';

@Injectable()
export class NestLogger implements LoggerService {
    constructor(private logger: Logger) {}

    log(message: any, context?: string): any {
        return this.logger.info({ context }, message);
    }

    error(message: any, trace?: string, context?: string): any {
        return this.logger.error({ context, trace }, message);
    }

    warn(message: any, context?: string): any {
        return this.logger.warn({ context }, message);
    }
    debug(message: any, context?: string): any {
        return this.logger.debug({ context }, message);
    }

    verbose(message: any, context?: string): any {
        return this.logger.trace({ context }, message);
    }
}
