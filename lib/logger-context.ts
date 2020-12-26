import { createNamespace } from 'cls-hooked';
import { NextFunction, Request, Response } from 'express';
import { Logger as PinoLogger } from 'pino';

const LOGGER_TOKEN = 'dozi-nest-pino-logger';
const ctx = createNamespace(LOGGER_TOKEN);

/**
 * Starts an async context for logger middleware
 * @param req
 * @param res
 * @param next
 */
export function startContext(req: Request, res: Response, next: NextFunction) {
    ctx.bindEmitter(req);
    ctx.bindEmitter(res);
    ctx.run(() => next());
}

/**
 * Take logger from request and set it to context
 * @param req
 * @param _res
 * @param next
 */
export function setLogger(req: Request, _res: Response, next: NextFunction) {
    ctx.set(LOGGER_TOKEN, req.log);
    next();
}

/**
 * Fetch logger from context
 */
export function getLogger(): PinoLogger {
    return ctx.get(LOGGER_TOKEN);
}

