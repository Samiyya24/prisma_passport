import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class RolesService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    create(createRoleDto: CreateRoleDto): import(".prisma/client").Prisma.Prisma__RoleClient<{
        id: number;
        name: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        users: ({
            user: {
                id: number;
                name: string;
                email: string;
                hashedPassword: string;
                hashedRefreshToken: string;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            userId: number;
            roleId: number;
        })[];
    } & {
        id: number;
        name: string;
    })[]>;
    findOne(id: number): string;
    update(id: number, updateRoleDto: UpdateRoleDto): string;
    remove(id: number): string;
}
