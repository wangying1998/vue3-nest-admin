/**
 * 全局异常过滤
 * @author wangying
 */

import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import * as moment from "moment";
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExeptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        // 用于接收主动发错的错误信息
        const { message, code } = exception.getResponse() as any;
        response.status(status).json({
            code: code || status,
            timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
            path: request.url,
            error: 'Error',
            message
        })
    }
}