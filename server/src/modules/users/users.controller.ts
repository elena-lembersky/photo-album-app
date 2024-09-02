import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/users')
  findAll() {
    return this.usersService.findAll();
  }

  @Get('/users/:id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Post('/users')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Put('/users/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete('/users/:id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
