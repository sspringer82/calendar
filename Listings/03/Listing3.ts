import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, CreateUser } from './User';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private static readonly hashRounds = 10;

  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) { }

  async create(newUser: CreateUser): Promise<User> {
    if (await this.isDuplicateUsername(newUser.username)) {
      throw new ConflictException('Username already exists');
    }

    const newUserClone = structuredClone(newUser);
    delete newUserClone.repeatPassword;
    newUserClone.password = await this.hashPassword(newUserClone.password);

    const createdUser = await this.usersRepository.save(newUserClone);
    delete createdUser.password;
    return createdUser;
  }

  async getByUsername(username: string): Promise<User> {
    try {
      return await this.usersRepository.findOneOrFail({
        select: {
          id: true,
          firstname: true,
          lastname: true,
          username: true,
          password: true,
        },
        where: { username },
      });
    } catch {
      throw new NotFoundException();
    }
  }

  private async isDuplicateUsername(username: string): Promise<boolean> {
    const users = await this.usersRepository.findBy({ username });
    return users.length > 0;
  }

  private hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, UsersService.hashRounds);
  }
}
