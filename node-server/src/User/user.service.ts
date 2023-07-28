import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/Entity/user.entity';
import { PageDTO } from './dto/user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>
    ) {}

    async getUserList(
        pageDTO: PageDTO
    ): Promise<Object> {
        const { page = 1, size = 10, uid = '' } = pageDTO;
        let str = "";
        if(uid) {
            str = "user.uid LIKE :uid"
        }
        const getList = this.userRepository
        .createQueryBuilder('user')
        .where(str, { uid: `%${uid}%` })
        .select()
        .skip(page)
        .take(size)
        .getManyAndCount()

        const list = await getList
        return {
            data: list[0],
            total: list[1]
        }
    }

    async create(body: any): Promise<Object> {
        await this.userRepository
        .insert(body)

        return 
    }

    async update(body: any): Promise<Object> {
        await this.userRepository
        .createQueryBuilder('user')
        .update('user')
        .set({
            uid: body.uid,
            name: body.name,
            sex: body.sex,
            age: body.age,
            mobile: body.mobile,
            email: body.email
        })
        .where('id = :id', { id: body.id })
        .execute()

        return 
    }

    async remove(id: string): Promise<Object> {
        await this.userRepository
        .createQueryBuilder()
        .delete()
        .from('user')
        .where("id = :id", { id })
        .printSql()
        .execute()

        return 
    }
}
