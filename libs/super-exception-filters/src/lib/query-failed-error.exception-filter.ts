import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class QueryFailedErrorExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // Check if the error is a unique constraint violation
    if (exception.message.includes('duplicate key value violates unique constraint')) {
      /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
      const detail = (exception.driverError as any).detail; // PostgreSQL specific, for other databases check driverError properties

      // Extract the field name causing the violation from the detail message
      const field = detail.match(/\((.*?)\)=\((.*?)\)/);
      const fieldName = field ? field[1] : 'unique field';

      // Customize the message based on the specific field
      const message = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} already exists.`;

      response.status(HttpStatus.CONFLICT).json({
        statusCode: HttpStatus.CONFLICT,
        message
      });
    } else {
      // For other types of errors, respond with a generic error message
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error'
      });
    }
  }
}
