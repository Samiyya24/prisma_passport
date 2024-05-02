import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
export declare class RolesController {
    private readonly rolesService;
    constructor(rolesService: RolesService);
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
    findOne(id: string): string;
    update(id: string, updateRoleDto: UpdateRoleDto): string;
    remove(id: string): string;
}
