import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './users.interface';

@Injectable()
export class UsersService {
  private readonly dataPath = path.resolve(
    __dirname,
    '../../../data/users.json',
  );

  async findAll(): Promise<User[]> {
    try {
      const data = await fs.promises.readFile(this.dataPath, 'utf8');
      return JSON.parse(data) as User[];
    } catch (error) {
      throw new Error('Failed to read users data');
    }
  }

  async findOne(id: string): Promise<User> {
    const users = await this.findAll();
    const user = users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`User with id: ${id} not found`);
    }
    return user;
  }

  async create(createUserDto: Partial<CreateUserDto>): Promise<User> {
    const users = await this.findAll();
    const newUser: User = {
      id: uuidv4(),
      name: createUserDto.name,
      email: createUserDto.email,
      albumCount: createUserDto.albumCount ?? 0,
      createdAt: createUserDto.createdAt,
      updatedAt: createUserDto.updatedAt,
    };
    users.push(newUser);
    await this.saveUsers(users);
    return newUser;
  }

  async update(
    id: string,
    updateUserDto: Partial<UpdateUserDto>,
  ): Promise<User> {
    const users = await this.findAll();
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`User with id: ${id} not found`);
    }
    const updatedUser = {
      ...users[userIndex],
      ...updateUserDto,
      updatedAt: new Date().toISOString(),
    };
    users[userIndex] = updatedUser;
    await this.saveUsers(users);
    return updatedUser;
  }

  async remove(id: string): Promise<void> {
    const users = await this.findAll();
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundException('User not found');
    }
    const updatedUsers = users.filter((user) => user.id !== id);
    await this.saveUsers(updatedUsers);
  }

  private async saveUsers(users: User[]): Promise<void> {
    try {
      await fs.promises.writeFile(
        this.dataPath,
        JSON.stringify(users, null, 2),
      );
    } catch (error) {
      throw new Error('Failed to save users data');
    }
  }
}
