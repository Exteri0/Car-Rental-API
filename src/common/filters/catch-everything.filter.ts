import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import {
  BaseError,
  UniqueConstraintError,
  ValidationError,
  ForeignKeyConstraintError,
  DatabaseError,
  ConnectionError,
} from 'sequelize';

interface ResponseBody {
  statusCode: number;
  timestamp: string;
  path: string;
  [key: string]: unknown;
}

interface ValidationExceptionResponse {
  response: {
    message: string[];
    error: string;
    statusCode?: number;
  };
}

@Catch()
export class CatchEverythingFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    let httpStatus: number;
    let response: string | Record<string, unknown>;
    // Handle different types of exceptions
    if (exception instanceof HttpException) {
      // NestJS HTTP exceptions (ConflictException, NotFoundException, etc.)
      httpStatus = exception.getStatus();
      response = exception.getResponse() as Record<string, unknown>;
    } else if (exception instanceof UniqueConstraintError) {
      // Sequelize unique constraint violations
      httpStatus = HttpStatus.CONFLICT;
      response = {
        error: 'Duplicate Entry',
        message: 'A record with this information already exists',
        details: exception.errors?.map((err) => ({
          field: err.path,
          value: err.value,
          message: err.message,
        })),
      };
    } else if (exception instanceof ValidationError) {
      // Sequelize validation errors
      httpStatus = HttpStatus.BAD_REQUEST;
      response = {
        error: 'Database Validation Error',
        message: 'The provided data is invalid',
        details: exception.errors?.map((err) => ({
          field: err.path,
          value: err.value,
          message: err.message,
        })),
      };
    } else if (exception instanceof ForeignKeyConstraintError) {
      // Sequelize foreign key constraint errors
      httpStatus = HttpStatus.BAD_REQUEST;
      response = {
        error: 'Foreign Key Constraint Error',
        message: 'Referenced record does not exist',
        details: {
          table: exception.table,
          field: exception.fields,
          value: exception.value,
        },
      };
    } else if (exception instanceof ConnectionError) {
      // Database connection errors
      httpStatus = HttpStatus.SERVICE_UNAVAILABLE;
      response = {
        error: 'Database Connection Error',
        message: 'Unable to connect to the database',
        details:
          process.env.NODE_ENV === 'development'
            ? exception.message
            : undefined,
      };
    } else if (exception instanceof DatabaseError) {
      // General database errors
      httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
      response = {
        error: 'Database Error',
        message: 'A database error occurred',
        details:
          process.env.NODE_ENV === 'development'
            ? exception.message
            : undefined,
      };
    } else if (exception instanceof BaseError) {
      // Catch-all for other Sequelize errors
      httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
      response = {
        error: 'Database Error',
        message: 'A database operation failed',
        details:
          process.env.NODE_ENV === 'development'
            ? exception.message
            : undefined,
      };
    } else if (exception instanceof TypeError) {
      // JavaScript Type Errors
      httpStatus = HttpStatus.BAD_REQUEST;
      response = {
        error: 'Type Error',
        message: 'Invalid data type provided',
        details: exception.message,
      };
    } else if (exception instanceof SyntaxError) {
      // JSON parsing errors, etc.
      httpStatus = HttpStatus.BAD_REQUEST;
      response = {
        error: 'Syntax Error',
        message: 'Invalid request format',
        details: exception.message,
      };
    } else if (exception instanceof ReferenceError) {
      // Reference errors
      httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
      response = {
        error: 'Reference Error',
        message: 'Internal server error',
        details:
          process.env.NODE_ENV === 'development'
            ? exception.message
            : 'An error occurred',
      };
    } else if (this.isValidationErrorResponse(exception)) {
      // Class-validator validation errors
      httpStatus = HttpStatus.BAD_REQUEST;
      response = {
        error: 'Validation Error',
        message: 'Request validation failed',
        details: exception.response.message, // ✅ Type-safe access
      };
    } else {
      // Unknown errors
      httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
      response = {
        error: 'Internal Server Error',
        message: 'An unexpected error occurred',
        details:
          process.env.NODE_ENV === 'development'
            ? String(exception)
            : undefined,
      };
    }

    const responseBody: ResponseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: String(httpAdapter.getRequestUrl(ctx.getRequest())),
      ...(typeof response === 'string' ? { message: response } : response),
    };

    // Log the error for debugging
    this.logError(exception, responseBody);

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }

  // Type guard function
  private isValidationErrorResponse(
    exception: unknown,
  ): exception is ValidationExceptionResponse {
    if (typeof exception !== 'object' || exception === null) {
      return false;
    }

    const ex = exception as ValidationExceptionResponse;
    return (
      ex.response &&
      typeof ex.response === 'object' &&
      Array.isArray(ex.response.message) &&
      ex.response.error === 'Bad Request'
    );
  }

  private logError(exception: unknown, responseBody: ResponseBody): void {
    if (responseBody.statusCode >= 500) {
      console.error('Server Error:', {
        error: exception,
        response: responseBody,
        stack: exception instanceof Error ? exception.stack : undefined,
      });
    } else {
      console.warn('Client Error:', {
        error:
          exception instanceof Error ? exception.message : String(exception),
        response: responseBody,
      });
    }
  }
}
