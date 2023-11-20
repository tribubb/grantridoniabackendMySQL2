// user.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class UsersService
{
  constructor
  (
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  // findOne was working well with the create method, but went with createQueryBuilder for consistency. Invalidate any perfect match, only one of each username
  async create(user: Users): Promise<Users | string> 
  {
    const existingUser = await this.userRepository
      .createQueryBuilder('user')
      .where('user.username = :username', { username: user.username })
      .getOne();
      
    if (existingUser) 
    {
      throw new NotFoundException('Username already exists');
    }

    // Hash the password for goodwill
    const hashedPassword = await bcryptjs.hash(user.password, 10);

    user.password = hashedPassword;
    
    return this.userRepository.save(user);
  }

  async login(username: string, password: string): Promise<Users | null> {
    const user = await this.userRepository
    .createQueryBuilder('user')
    .where('user.username = :username', { username })
    .getOne();

    if (!user) 
    {
      return null;
    }
    const isPasswordMatchHash = await bcryptjs.compare(password, user.password);

    if (isPasswordMatchHash)
    {
      return user;
    }
    else
    {
      return null;
    }
  }

  async deleteUser(username: string): Promise<Users | null> 
  {
    try 
    {
      const user = await this.userRepository.findOne({ where: { username } });

      if (!user) 
      {
        throw new NotFoundException(`User with username ${username} not found`);
      }

      await this.userRepository.remove(user);
      return user;
    } 
    catch (error) 
    {
      return null;
    }
  }
}