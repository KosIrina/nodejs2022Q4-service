import { Injectable, LoggerService } from '@nestjs/common';
import 'dotenv/config';
import { mkdirSync, appendFileSync, renameSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { Buffer } from 'node:buffer';

enum LogLevels {
  Log,
  Error,
  Warn,
  Debug,
  Verbose,
}

const BYTES_IN_KILOBYTE = 1024;
const DEFAULT_LOGGING_LEVEL = 1;
const DEFAULT_LOGGING_MAX_FILE_SIZE_KB = 25;

@Injectable()
export class CustomLogger implements LoggerService {
  private readonly currentLevel: number;
  private readonly currentMaxFileSize: number;
  private readonly errorsFolder: string;
  private readonly otherFolder: string;

  constructor() {
    this.currentLevel = +process.env.LOGGING_LEVEL || DEFAULT_LOGGING_LEVEL;
    this.currentMaxFileSize =
      +process.env.LOGGING_MAX_FILE_SIZE_KB || DEFAULT_LOGGING_MAX_FILE_SIZE_KB;
    this.errorsFolder = join(`${process.cwd()}`, 'logs', 'errors');
    this.otherFolder = join(`${process.cwd()}`, 'logs', 'other');
    mkdirSync(this.errorsFolder, { recursive: true });
    mkdirSync(this.otherFolder, { recursive: true });
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
    this.writeToFile(level, dataToWrite);
  }

  private writeToFile(level: LogLevels, data: string) {
    const fileName = level === LogLevels.Error ? 'error.log' : 'app.log';
    const filePath =
      level === LogLevels.Error
        ? join(this.errorsFolder, fileName)
        : join(this.otherFolder, fileName);

    try {
      const { size: fileSize } = statSync(filePath);
      const dataSize = Buffer.byteLength(data, 'utf8');
      const maxFileSize = this.currentMaxFileSize * BYTES_IN_KILOBYTE;

      if (fileSize + dataSize > maxFileSize) {
        const filledFilePath = join(
          dirname(filePath),
          `${fileName.split('.')[0]}-${Date.now()}.${fileName.split('.')[1]}`,
        );
        renameSync(filePath, filledFilePath);
      }
    } catch (err) {}

    appendFileSync(filePath, data, 'utf-8');
  }
}
