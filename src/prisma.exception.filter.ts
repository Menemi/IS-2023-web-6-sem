import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { Response } from "express";
import { Prisma } from "@prisma/client";

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = 500;
    let message: string = null;

    if (exception.code == "P2025") {
      status = 404;
      message = "Nonexistent Object";
    } else if (exception.code == "P2002") {
      status = 400;
      message = "Not unique email";
    }

    response.status(status).json({
      statusCode: status,
      message: message
    });
  }
}