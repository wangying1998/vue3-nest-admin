import { Column, PrimaryGeneratedColumn } from "typeorm";

// 基类：可实现实体继承
export abstract class Content {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string
}