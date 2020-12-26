import { createParamDecorator } from '@nestjs/common';

// todo conflict with Logger class
export const Logger = createParamDecorator((_data, req) => req.log);
