import { createNamespace } from 'cls-hooked';
import { NextFunction, Request, Response } from 'express';
import { Logger } from 'pino';
import {LOGGER_ASYNC_TOKEN} from './constants';

const ctx = createNamespace(LOGGER_ASYNC_TOKEN);

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
    ctx.set(LOGGER_ASYNC_TOKEN, req.log);
    next();
}

/**
 * Fetch logger from context
 */
export function getLogger(): Logger {
    return ctx.get(LOGGER_ASYNC_TOKEN);
}

