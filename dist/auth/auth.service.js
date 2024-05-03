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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const prisma_service_1 = require("../prisma/prisma.service");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
let AuthService = class AuthService {
    constructor(prismaService, jwtService, userwsService, logger) {
        this.prismaService = prismaService;
        this.jwtService = jwtService;
        this.userwsService = userwsService;
        this.logger = logger;
    }
    async getTokens(userId, email) {
        const jwtPayload = {
            sub: userId,
            email: email,
        };
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(jwtPayload, {
                secret: process.env.ACCESS_TOKEN_KEY,
                expiresIn: process.env.ACCESS_TOKEN_TIME,
            }),
            this.jwtService.signAsync(jwtPayload, {
                secret: process.env.REFRESH_TOKEN_KEY,
                expiresIn: process.env.REFRESH_TOKEN_TIME,
            }),
        ]);
        return {
            access_token: accessToken,
            refresh_token: refreshToken,
        };
    }
    async updateRefreshToken(userId, refreshToken) {
        const hashedRefreshToken = await bcrypt.hash(refreshToken, 7);
        await this.prismaService.user.update({
            where: {
                id: userId,
            },
            data: {
                hashedRefreshToken,
            },
        });
    }
    async signUp(createUserDto, res) {
        const newUser = await this.userwsService.create(createUserDto);
        if (!newUser) {
            throw new common_1.InternalServerErrorException('Yange user yaratishda xatolik');
        }
        const tokens = await this.getTokens(newUser.id, newUser.email);
        await this.updateRefreshToken(newUser.id, tokens.refresh_token);
        res.cookie('refresh_token', tokens.refresh_token, {
            maxAge: Number(process.env.COOKIE_TIME),
            httpOnly: true,
        });
        return tokens;
    }
    async signIn(email, password, res) {
        this.logger.log('Calling signin()', users_service_1.UsersService.name);
        this.logger.debug('Calling signin()', users_service_1.UsersService.name);
        this.logger.verbose('Calling signin()', users_service_1.UsersService.name);
        this.logger.warn('Calling signin()', users_service_1.UsersService.name);
        try {
            throw new Error();
        }
        catch (e) {
            this.logger.error('Calling signin()', e.stack, users_service_1.UsersService.name);
        }
        this.logger.debug('signin', users_service_1.UsersService.name);
        const user = await this.prismaService.user.findUnique({
            where: {
                email: email,
            },
        });
        if (!user) {
            throw new common_1.BadRequestException('Invalid email or password');
        }
        const passwordMatch = await bcrypt.compare(password, user.hashedPassword);
        if (!passwordMatch) {
            throw new common_1.BadRequestException('Invalid email or password');
        }
        const tokens = await this.getTokens(user.id, user.email);
        await this.updateRefreshToken(user.id, tokens.refresh_token);
        res.cookie('refresh_token', tokens.refresh_token, {
            maxAge: Number(process.env.COOKIE_TIME),
            httpOnly: true,
        });
        return tokens;
    }
    async signout(userId, res) {
        console.log(userId);
        const user = await this.prismaService.user.updateMany({
            where: {
                id: userId,
                hashedRefreshToken: {
                    not: null,
                },
            },
            data: {
                hashedRefreshToken: null,
            },
        });
        if (!user)
            throw new common_1.ForbiddenException('Acces Denied');
        res.clearCookie('refresh_token');
        return true;
    }
    async refreshTokens(userId, refreshToken, res) {
        const user = await this.prismaService.user.findUnique({
            where: {
                id: userId,
            },
        });
        if (!user || !user.hashedRefreshToken)
            throw new common_1.ForbiddenException('Access Denied1');
        const rtMatches = await bcrypt.compare(refreshToken, user.hashedRefreshToken);
        if (!rtMatches)
            throw new common_1.ForbiddenException('Access Denied2');
        const tokens = await this.getTokens(user.id, user.email);
        await this.updateRefreshToken(user.id, tokens.refresh_token);
        res.cookie('refresh_token', tokens.refresh_token, {
            maxAge: 15 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        });
        return tokens;
    }
    create(createAuthDto) {
        return 'This action adds a new auth';
    }
    findAll() {
        return `This action returns all auth`;
    }
    findOne(id) {
        return `This action returns a #${id} auth`;
    }
    update(id, updateAuthDto) {
        return `This action updates a #${id} auth`;
    }
    remove(id) {
        return `This action removes a #${id} auth`;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        users_service_1.UsersService,
        common_1.Logger])
], AuthService);
//# sourceMappingURL=auth.service.js.map