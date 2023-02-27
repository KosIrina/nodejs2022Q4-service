import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CustomLogger } from './logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: CustomLogger) {}

  use(req: Request, res: Response, next: NextFunction) {
    res.on('finish', () => {
      const message = `${req.method} Url: ${
        req.originalUrl
      } Query: ${JSON.stringify(req.query)} Body: ${JSON.stringify(
        req.body,
      )} - ${res.statusCode}`;

      if (res.statusCode >= 400) {
        this.logger.error(message);
      } else {
        this.logger.log(message);
      }
    });

    next();
  }
}
