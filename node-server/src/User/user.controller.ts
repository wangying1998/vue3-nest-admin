import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    Redirect,
} from '@nestjs/common';
import { UserService } from './user.service';
import AppDataSource from 'src/DataSource/app-data-source';
import { PageDTO } from './dto/user.dto';

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
