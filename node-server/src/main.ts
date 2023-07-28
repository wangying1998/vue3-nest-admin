/**
 * 应用程序入口文件。用来创建Nest应用实例。
 * @author wangying
*/

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExeptionFilter } from './Filter/exception.filter';
import { TransformInterceptor } from './Interceptor/transform.interceptor';

async function bootstrap() {
    // 使用核心类 NestFactory 返回一个 接口对象
    const app = await NestFactory.create(AppModule);
    // 设置全局监听的api前缀
    app.setGlobalPrefix('api');
    // 全局注册 异常处理过滤器
    app.useGlobalFilters(new HttpExeptionFilter());
    // 全局注册拦截器
    app.useGlobalInterceptors(new TransformInterceptor())
    // 这里是默认设置的端口号
    await app.listen(8083);
}
bootstrap();
