import {DynamicModule, Inject, MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import {AsyncLoggerParams, LoggerParams} from './types';
import * as pinoHttp from 'pino-http';
import {setLogger, startContext} from './context';
import {Logger, LOGGER_PINO, NestLogger} from './loggers';
import {LOGGER_OPTS_TOKEN} from './constants';

const PROVIDERS = [Logger, NestLogger, LOGGER_PINO];

@Module({
    providers: PROVIDERS,
    exports: PROVIDERS,
})
export class LoggerModule implements NestModule {
    static forRoot(opts: LoggerParams = {}): DynamicModule {
        return {
            module: LoggerModule,
            exports: PROVIDERS,
            providers: [
                {
                    provide: LOGGER_OPTS_TOKEN,
                    useValue: opts,
                },
                ...PROVIDERS
            ],
        };
    }

    static forRootAsync(opts: AsyncLoggerParams): DynamicModule {
        return {
            module: LoggerModule,
            imports: opts.imports,
            exports: PROVIDERS,
            providers: [
                {
                    provide: LOGGER_OPTS_TOKEN,
                    useFactory: opts.useFactory,
                    inject: opts.inject,
                },
                ...PROVIDERS
            ],
        };
    }

    /**
     * Injecting logger options created by calling forRoot/forRootAsync
     * @param opts LoggerParams
     */
    constructor(@Inject(LOGGER_OPTS_TOKEN) private readonly opts: LoggerParams) {
    }

    /**
     * 1. Creates logger from configuration.
     * 2. Attach logger to request context
     * 3. Attach HTTP logger as middleware
     * @param consumer MiddlewareConsumer
     */
    // configure HTTP logger (replacement for morgan)
    configure(consumer: MiddlewareConsumer): any {
        /**
         * Middlewares:
         * 1. Start new context (using cls-hooked)
         * 2. Attach HTTP logger (pinoHttp)
         * 3. Add the logger to the the context
         */
        consumer
            .apply(startContext, pinoHttp(this.opts), setLogger)
            .forRoutes({ path: '*', method: RequestMethod.ALL });
    }
}
