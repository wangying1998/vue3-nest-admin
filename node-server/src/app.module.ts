/**
 * 应用程序的根模块
 */

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './User/user.module';
import { MenuModule } from './Menu/menu.module';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { User } from './Entity/user.entity';

@Module({
    imports: [
        UserModule,
        MenuModule,
        // 连接 mysql
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: '',
            database: 'local',
            // 要使用实体，需要在模块的forRoot()方法的选项中，将它插入到entities数组中来让typeOrm知道它的存在
            // entities: [User],
            // 自动引入实体
            entities: [
                'Entity/*.entity.ts'
            ],
            // 自动查找 Entity 实体
            autoLoadEntities: true,
            // 自动创建数据库表，不要设置于生产环境，否则可能会丢失生产环境数据
            synchronize: true
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
