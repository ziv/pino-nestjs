import {Options} from 'pino-http';
import {FactoryProvider, ModuleMetadata} from '@nestjs/common';

export type LoggerParams = Options;
export type AsyncLoggerParams = Pick<ModuleMetadata, 'imports'> & Pick<FactoryProvider<Options>, 'useFactory' | 'inject'>;
