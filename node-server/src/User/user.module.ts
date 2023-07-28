import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { User } from '../Entity/user.entity';

@Module({
    /**
     * 此模块使用 forFeature() 方法定义在当前范围中注册哪些存储库
     * 这样我们就可以使用 @InjectRepository() 装饰器将 UserRepository 注入到 UserService 中
     */
    imports: [
        TypeOrmModule.forFeature([User])
    ],
    controllers: [UserController],
    providers: [UserService]
})

export class UserModule {}
