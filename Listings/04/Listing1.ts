import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next: NextFunction) {
    console.log(
      `Incoming Request: ${request.method} ${request.url} HTTP ${request.httpVersion}`,
    );
    next();
  }
}
