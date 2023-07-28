
/**
 * 存储库设计模式
 * 实体：每个实体都有对应的存储库
 *
 */

import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';
import { SexRole } from './../EnumList/sexRole';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        comment: 'UID',
        nullable: false,
        type: 'varchar',
        length: 50,
    })
    uid: string;

    @Column({
        comment: '姓名',
        nullable: false,
        type: 'varchar',
        length: 50,
    })
    name: string;

    @Column({
        comment: '性别',
        type: 'enum',
        enum: SexRole,
        default: SexRole.Boy
    })
    sex: SexRole

    @Column({
        comment: '年龄',
        nullable: false,
        type: 'int',
    })
    age: number

    @Column({
        comment: '手机号',
        nullable: false,
        type: 'varchar',
        length: 11,
    })
    mobile: string

    @Column({
        comment: '邮箱',
        nullable: false,
        type: 'varchar',
    })
    email: string
}
