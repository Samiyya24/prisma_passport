"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = require("bcrypt");
let UsersService = class UsersService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async create(createUserDto) {
        const candidate = await this.prismaService.user.findUnique({
            where: {
                email: createUserDto.email,
            },
        });
        if (candidate) {
            throw new common_1.BadRequestException('User already exists!');
        }
        const role = await this.prismaService.role.findUnique({
            where: {
                name: createUserDto.role,
            },
        });
        if (!role) {
            throw new common_1.NotFoundException('Role not found!');
        }
        const hashedPassword = await bcrypt.hash(createUserDto.password, 7);
        const newUser = await this.prismaService.user.create({
            data: {
                name: createUserDto.name,
                email: createUserDto.email,
                hashedPassword,
                roles: { create: [{ roleId: role.id }] }
            },
        });
        return newUser;
    }
    findAll() {
        return this.prismaService.user.findMany({
            include: { roles: { include: { role: true } } },
        });
    }
    findOne(id) {
        return `This action returns a #${id} user`;
    }
    update(id, updateUserDto) {
        return `This action updates a #${id} user`;
    }
    remove(id) {
        return `This action removes a #${id} user`;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map