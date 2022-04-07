import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ChannelMembers } from 'src/entities/ChannelMembers';
import { Users } from 'src/entities/Users';
import { WorkspaceMembers } from 'src/entities/WorkspaceMembers';
import { getRepository } from 'typeorm';
import { UsersService } from './users.service';

class MockUserRepository {
  #data = [{ id: 1, email: 'dyonglove@gmail.com'}];
  findOne({ where: { email } }) {
    const data = this.#data.find((v) => v.email === email);
    if ( data ) {
      return data;
    }
    return null;
  }
}

class MockWorkspaceMembersRepository {}
class MockChannelMembersRepository {}

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(Users),
          useClass: MockUserRepository
        },
        {
          provide: getRepositoryToken(WorkspaceMembers),
          useClass: MockWorkspaceMembersRepository
        },
        {
          provide: getRepositoryToken(ChannelMembers),
          useClass: MockChannelMembersRepository
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findByEmail should find user by email', () => {
    expect(service.findByEmail('dyonglove@gmail.com')).resolves.toStrictEqual({
      email: 'dyonglove@gmail.com',
      id: 1
    });
  });

  it('findByEmail should return null if it cannot find user', () => {
    expect(service.findByEmail('dyonglove@gmail.com')).resolves.toBe(null);
  });
});
