import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '@modules/users/users.service';
import * as fs from 'fs/promises';
import { jest } from '@jest/globals';
import { CreateUserDto, UpdateUserDto } from '@modules/users/dto';

describe('UsersService', () => {
  let usersService: UsersService;

  const mockUsers = [
    {
      id: '1',
      name: 'Alice',
      email: 'alice@example.com',
      albumCount: 5,
      createdAt: '2023-08-30T12:00:00Z',
      updatedAt: '2023-08-30T12:00:00Z',
    },
    {
      id: '2',
      name: 'Bob',
      email: 'bob@example.com',
      albumCount: 3,
      createdAt: '2023-08-30T12:00:00Z',
      updatedAt: '2023-08-30T12:00:00Z',
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    usersService = module.get<UsersService>(UsersService);

    jest.spyOn(fs, 'readFile').mockResolvedValue(JSON.stringify(mockUsers));
    jest.spyOn(fs, 'writeFile').mockResolvedValue();
    jest
      .spyOn(global.Date, 'now')
      .mockReturnValue(new Date('2024-08-29T12:38:55.750Z').getTime());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return all users', async () => {
    const users = await usersService.findAll();
    expect(users).toEqual(mockUsers);
  });

  it('should create a new user with createdAt and updatedAt fields', async () => {
    const newUserMock: Partial<CreateUserDto> = {
      name: 'Charlie',
      email: 'charlie@example.com',
    };

    const newUser = await usersService.create(newUserMock);

    expect(newUser.name).toBe(newUserMock.name);
    expect(newUser.email).toBe(newUserMock.email);
    expect(newUser).toHaveProperty('albumCount', 0);
    expect(newUser).toHaveProperty('createdAt');
    expect(newUser).toHaveProperty('updatedAt');
  });

  it('should update an existing user and set updatedAt field', async () => {
    const updateUserMock: Partial<UpdateUserDto> = {
      name: 'Updated Charlie',
      email: 'updated_charlie@example.com',
    };

    const updatedUser = await usersService.update('1', updateUserMock);

    expect(updatedUser.name).toBe(updateUserMock.name);
    expect(updatedUser.email).toBe(updateUserMock.email);

    expect(updatedUser).toHaveProperty('albumCount', mockUsers[0].albumCount);
    expect(new Date(updatedUser.updatedAt)).not.toEqual(
      new Date(mockUsers[0].updatedAt),
    );
    expect(new Date(updatedUser.createdAt)).toEqual(
      new Date(mockUsers[0].createdAt),
    );
  });

  it('should throw an error when trying to update a non-existent user', async () => {
    const updateUserMock: Partial<UpdateUserDto> = {
      name: 'NonExistent User',
      email: 'nonexistent@example.com',
    };

    await expect(usersService.update('999', updateUserMock)).rejects.toThrow(
      'User with id: 999 not found',
    );
  });

  it('should remove a user', async () => {
    await usersService.remove('1');
    const expectedUsers = mockUsers.filter((user) => user.id !== '1');
    expect(fs.writeFile).toHaveBeenCalledWith(
      expect.any(String),
      JSON.stringify(expectedUsers, null, 2),
    );
  });

  it('should throw an error when trying to remove a non-existent user', async () => {
    await expect(usersService.remove('999')).rejects.toThrow('User not found');
  });
});
