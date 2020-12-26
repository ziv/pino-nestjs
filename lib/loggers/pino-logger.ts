import {Provider} from '@nestjs/common';
import {LOGGER_OPTS_TOKEN, LOGGER_PINO_RAW} from '../constants';
import {LoggerParams} from '../types';
import pino, {Logger} from 'pino';

export const LOGGER_PINO: Provider<Logger> = {
    provide: LOGGER_PINO_RAW,
    useFactory: (params: LoggerParams) => pino(params),
    inject: [LOGGER_OPTS_TOKEN]
};
