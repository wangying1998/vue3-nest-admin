import { Content } from "src/AbstructEntity/content.abs";
import { Column, Entity } from "typeorm";

@Entity()

// 创建Article类 继承Content基类
export class Article extends Content {
    @Column()
    author: string
}