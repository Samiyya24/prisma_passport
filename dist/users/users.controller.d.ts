import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<{
        id: number;
        name: string;
        email: string;
        hashedPassword: string;
        hashedRefreshToken: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        roles: ({
            role: {
                id: number;
                name: string;
            };
        } & {
            userId: number;
            roleId: number;
        })[];
    } & {
        id: number;
        name: string;
        email: string;
        hashedPassword: string;
        hashedRefreshToken: string;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findOne(id: string): string;
    update(id: string, updateUserDto: UpdateUserDto): string;
    remove(id: string): string;
}
