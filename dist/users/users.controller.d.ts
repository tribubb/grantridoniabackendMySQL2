import { Response } from 'express';
import { UsersService } from './users.service';
export declare class UsersController {
    private service;
    constructor(service: UsersService);
    register(userData: any): Promise<void>;
    login({ username, password }: any, res: Response): Promise<void>;
    deleteUser({ username }: {
        username: string;
    }, res: Response): Promise<Response<any, Record<string, any>>>;
}
