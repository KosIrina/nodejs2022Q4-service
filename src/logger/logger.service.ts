import { Injectable, LoggerService } from '@nestjs/common';
import 'dotenv/config';

enum LogLevels {
  Log,
  Error,
  Warn,
  Debug,
  Verbose,
}

@Injectable()
export class CustomLogger implements LoggerService {
  private readonly currentLevel: number;

  constructor() {
    this.currentLevel = +process.env.LOGGING_LEVEL;
  }

  log(message: any, ...optionalParams: any[]) {
    this.write(LogLevels.Log, message, optionalParams);
  }

  error(message: any, ...optionalParams: any[]) {
    this.write(LogLevels.Error, message, optionalParams);
  }

  warn(message: any, ...optionalParams: any[]) {
    this.write(LogLevels.Warn, message, optionalParams);
  }

  debug(message: any, ...optionalParams: any[]) {
    this.write(LogLevels.Debug, message, optionalParams);
  }

  verbose(message: any, ...optionalParams: any[]) {
    this.write(LogLevels.Verbose, message, optionalParams);
  }

  private write(level: LogLevels, message: any, params: any[]) {
    if (level > this.currentLevel) {
      return;
    }

    const dataToWrite =
      `${LogLevels[level].toUpperCase()} ${message} ${params.join(' ')}` + '\n';

    process.stdout.write(dataToWrite);
  }
}
