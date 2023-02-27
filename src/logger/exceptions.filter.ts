import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { CustomLogger } from './logger.service';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly logger: CustomLogger,
  ) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    let httpStatus: number;
    let responseBody: Record<string, unknown>;

    if (exception instanceof HttpException) {
      httpStatus = exception.getStatus();
      responseBody = { httpStatus, message: exception.message };
    } else {
      httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
      responseBody = { httpStatus, message: 'Internal server error' };

      this.logger.error(exception);
    }

    this.logger.error(
      `Response: ${httpStatus} ${JSON.stringify(responseBody)}`,
    );

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
