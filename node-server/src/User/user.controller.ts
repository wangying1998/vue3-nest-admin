import {
    Body,
    Controller,
    Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { PageDTO } from '../DTO/page.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    
    @Post('getUserList')
    getUserList(@Body() pageDTO: PageDTO) {
        return this.userService.getUserList(pageDTO);
    }

    @Post('addUser')
    add(@Body() body: any) {
        return this.userService.create(body);
    }

    @Post('updateUser')
    update(@Body() body: any) {
        return this.userService.update(body);
    }

    @Post('delUser')
    remove(@Body() body: any) {
        return this.userService.remove(body.id);
    }
}
