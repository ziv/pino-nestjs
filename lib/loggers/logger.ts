import pino, {Logger as PinoLogger, LoggerOptions} from 'pino';
import {Inject, Injectable} from '@nestjs/common';
import {LOGGER_OPTS_TOKEN} from '../constants';
import {getLogger} from '../context';

// todo discuss the scope
@Injectable()
export class Logger {
    // Logger without context
    rootLogger: PinoLogger;
    constructor(@Inject(LOGGER_OPTS_TOKEN) opts: LoggerOptions = {}) {
        if (!this.rootLogger) {
            this.rootLogger = pino(opts);
        }
    }

    get logger(): PinoLogger {
        return getLogger() || this.rootLogger;
    }

    fatal(...args) {
        return this.logger.fatal.call(this.logger, ...args);
    }

    error(...args) {
        return this.logger.error.call(this.logger, ...args);
    }

    warn(...args) {
        return this.logger.warn.call(this.logger, ...args);
    }

    info(...args) {
        return this.logger.info.call(this.logger, ...args);
    }

    debug(...args) {
        return this.logger.debug.call(this.logger, ...args);
    }

    trace(...args) {
        return this.logger.trace.call(this.logger, ...args);
    }

    silent(...args) {
        return this.logger.silent.call(this.logger, ...args);
    }
}
