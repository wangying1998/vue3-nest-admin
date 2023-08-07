import { MenuController } from './menu.controller';
import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from 'src/Entity/menu.entity';
import { MenuService } from './menu.service';

@Module ({
    imports: [
        TypeOrmModule.forFeature([
            Menu
        ])
    ],
    controllers: [MenuController],
    providers: [MenuService]
})

export class MenuModule {}