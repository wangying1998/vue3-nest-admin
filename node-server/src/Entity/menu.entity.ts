import { IdAbs } from 'src/AbstructEntity/id.abs';
import {
    Entity,
    Tree,
    Column,
    PrimaryGeneratedColumn,
    TreeChildren,
    TreeParent,
    TreeLevelColumn,
    CreateDateColumn,
} from 'typeorm';

@Entity()
@Tree('closure-table')
export class Menu extends IdAbs {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    created: Date;

    @CreateDateColumn()
    updated: Date;

    @Column({
        comment: '路由',
        default: '',
        nullable: false,
    })
    name: string;

    @Column({
        comment: '菜单名称',
        default: '',
        nullable: false,
    })
    title: string;

    @Column({
        comment: '菜单图标',
        default: '',
        nullable: false,
    })
    icon: string;

    @Column({
        comment: '状态',
        default: 1,
        nullable: false,
    })
    status: number;

    @TreeChildren()
    children: Menu[];

    @TreeParent()
    parent: Menu;
}
