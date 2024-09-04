import {
  Injectable,
  Inject,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { IStorage } from 'common/interfaces/i-storage.interface';
import { CreateUserDto, UpdateUserDto } from './dto';
import { User } from './users.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(@Inject('IStorage') private storage: IStorage) {}

  private readonly filePath = '../../../data/users.json';

  // Fetch all users
  async findAll(): Promise<User[]> {
    return await this.storage.read<User[]>(this.filePath);
  }

  // Fetch a specific user by ID
  async findOne(id: string): Promise<User> {
    const users = await this.findAll();
    const user = users.find((user) => user.id === id);
    if (!user) throw new NotFoundException(`User with ID: ${id} not found`);
    return user;
  }

  // Create a new user
  async create(createUserDto: CreateUserDto): Promise<User> {
    const users = await this.findAll();
    const newUser: User = {
      id: uuidv4(),
      ...createUserDto,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    users.push(newUser);
    await this.storage.write(this.filePath, users);
    return newUser;
  }

  // Update an existing user
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const users = await this.findAll();
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      throw new NotFoundException(`User with ID: ${id} not found`);
    }

    const existingUser = users[userIndex];

    // Compare the existing user data with the new data to check if changes are made
    const isDataChanged = Object.keys(updateUserDto).some(
      (key) => (existingUser as any)[key] !== (updateUserDto as any)[key],
    );

    if (!isDataChanged) {
      throw new BadRequestException('No changes detected in user data');
    }

    const updatedUser = {
      ...existingUser,
      ...updateUserDto,
      updatedAt: new Date().toISOString(), // update `updatedAt` timestamp
    };

    users[userIndex] = updatedUser;
    await this.storage.write(this.filePath, users);
    return updatedUser;
  }

  // Remove a user by ID
  async remove(id: string): Promise<void> {
    const users = await this.findAll();
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      throw new NotFoundException(`User with ID: ${id} not found`);
    }

    const updatedUsers = users.filter((user) => user.id !== id);
    await this.storage.write(this.filePath, updatedUsers);
  }
}
