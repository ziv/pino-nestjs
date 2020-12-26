import { createParamDecorator } from '@nestjs/common';

export const Log = createParamDecorator((_data, req) => req.log);
