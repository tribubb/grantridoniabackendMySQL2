import { Repository } from 'typeorm';
import { Users } from './users.entity';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: Repository<Users>);
    create(user: Users): Promise<Users | string>;
    login(username: string, password: string): Promise<Users | null>;
    deleteUser(username: string): Promise<Users | null>;
}
