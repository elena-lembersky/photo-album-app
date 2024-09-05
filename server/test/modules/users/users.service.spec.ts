import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '@modules/users/users.service';
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

  const mockStorage = {
    read: jest.fn().mockResolvedValue(mockUsers),
    write: jest.fn().mockResolvedValue(undefined),
    update: jest.fn().mockResolvedValue(true),
    delete: jest.fn().mockResolvedValue(true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: 'IStorage', useValue: mockStorage }, // Inject the mock storage
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);

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
    expect(mockStorage.read).toHaveBeenCalledWith('../../../data/users.json');
  });

  it('should create a new user with createdAt and updatedAt fields', async () => {
    const newUserMock: CreateUserDto = {
      name: 'Charlie',
      email: 'charlie@example.com',
      albumCount: 3,
      createdAt: '2023-08-30T12:00:00Z',
      updatedAt: '2023-08-30T12:00:00Z',
    };

    const newUser = await usersService.create(newUserMock);

    expect(newUser.name).toBe(newUserMock.name);
    expect(newUser.email).toBe(newUserMock.email);
    expect(newUser).toHaveProperty('albumCount', 3);
    expect(newUser).toHaveProperty('createdAt');
    expect(newUser).toHaveProperty('updatedAt');
    expect(mockStorage.write).toHaveBeenCalled();
  });

  it('should update an existing user and set updatedAt field', async () => {
    const updateUserMock: UpdateUserDto = {
      name: 'Updated Charlie',
      email: 'updated_charlie@example.com',
    };

    const updatedUser = await usersService.update('1', updateUserMock);

    expect(updatedUser.name).toBe(updateUserMock.name);
    expect(updatedUser.email).toBe(updateUserMock.email);
    expect(updatedUser).toHaveProperty('albumCount', mockUsers[0].albumCount);
    expect(updatedUser.updatedAt).toEqual(
      expect.stringContaining(new Date().toISOString().slice(0, 10)),
    );
    expect(mockStorage.write).toHaveBeenCalled();
  });

  it('should throw an error when trying to update a non-existent user', async () => {
    mockStorage.read.mockResolvedValueOnce([]);
    const updateUserMock: UpdateUserDto = {
      name: 'NonExistent User',
      email: 'nonexistent@example.com',
      albumCount: 3,
    };

    await expect(usersService.update('999', updateUserMock)).rejects.toThrow(
      'User with ID: 999 not found',
    );
  });

  it('should remove a user', async () => {
    await usersService.remove('1');
    const expectedUsers = mockUsers.filter((user) => user.id !== '1');
    expect(mockStorage.write).toHaveBeenCalledWith(
      '../../../data/users.json',
      expectedUsers,
    );
  });

  it('should throw an error when trying to remove a non-existent user', async () => {
    mockStorage.read.mockResolvedValueOnce([]);
    await expect(usersService.remove('999')).rejects.toThrow(
      'User with ID: 999 not found',
    );
  });
});
