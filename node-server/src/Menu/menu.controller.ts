import menuList from 'src/utils/menu.json';
import { Body, Controller, Post } from "@nestjs/common";
import { MenuService } from "./menu.service";
import { Menu } from "src/Entity/menu.entity";

@Controller('menu')

export class MenuController {
    constructor (
        private readonly menuService: MenuService,
    ) {}

    @Post('list')
    getMenu() {
        return this.menuService.getMenu();
    }

    @Post('add')
    addMenu(@Body() body: any) {
        return this.menuService.addMenu(body);
    }
    
    
    
}