/**
 * 带有单个路由的基本控制器示例
 */

import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

// 控制器设置路由前缀   可以理解为局部路由
@Controller('test')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // 方法装饰器设置路由前缀，可以理解为api子路由
  @Get('find')
  getHello(): Object {
    return this.appService.getHello();
  }
}
// 上述方式在api中映射的完整路由为： GET api/test/find
