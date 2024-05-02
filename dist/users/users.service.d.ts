import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class UsersService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
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
    findOne(id: number): string;
    update(id: number, updateUserDto: UpdateUserDto): string;
    remove(id: number): string;
}
