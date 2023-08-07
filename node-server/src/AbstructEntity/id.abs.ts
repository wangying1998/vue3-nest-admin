import { PrimaryGeneratedColumn } from "typeorm";

// 基类：可实现实体继承
export abstract class IdAbs {
    @PrimaryGeneratedColumn()
    id: number
}