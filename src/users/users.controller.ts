// user.controller.ts
import { Controller, Post, Delete, Body, NotFoundException, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

import { UsersService } from './users.service';

// Handle success to service, and display error messages on fail
@Controller('user')
export class UsersController {
  constructor(private service: UsersService) {}

  @Post('register')
  async register(@Body() userData: any) {
    const user = await this.service.create(userData);
  }

  @Post('login')
  async login(@Body() { username, password }: any, @Res() res: Response) {
    try {
      const user = await this.service.login(username, password);

      if (user) 
      {
        res.status(HttpStatus.OK).json({ user });
      } 
      else 
      {
        res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Invalid username or password' });
      }
    } 
    catch (error) 
    {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred while logging in' });
    }
  }

  @Delete(':username')
  async deleteUser(@Body() { username }: { username: string }, @Res() res: Response) {
    try {
      const deletedUser = await this.service.deleteUser(username);

      if (!deletedUser) {
        throw new NotFoundException(`Username: ${username} not found`);
      }

      return res.status(HttpStatus.NO_CONTENT).send();
    } 
    catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error occurred while deleting this user' });
    }
  } 
}