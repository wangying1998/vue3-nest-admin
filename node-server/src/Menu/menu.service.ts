import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, TreeRepository } from 'typeorm';
import { Menu } from 'src/Entity/menu.entity';

@Injectable()
export class MenuService {
    constructor(
        @InjectRepository(Menu)
        private menuRepository: TreeRepository<Menu>,
    ) {}
    
    // 添加菜单
    async addMenu(body: any): Promise<Menu> {
        console.log(body)
        const TabMenu = new Menu();

        TabMenu.name = body.name;
        TabMenu.icon = body.icon;
        TabMenu.title = body.title;
        if (body.pid != 0) {
            const parent = await this.menuRepository
                            .createQueryBuilder('menu')
                            .where("id = :id", { id: body.pid })
                            .select()
                            .getOne();
            if (!parent) {
                throw new Error('父级菜单不存在');
            }
            TabMenu.parent = parent;
        }

        
        return await this.menuRepository.save(TabMenu);
    }

    // 查询所有菜单
    async getMenu(): Promise<Menu[]> {
        let findMenu = await this.menuRepository.findTrees();

        return findMenu;
    }
}
