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
exports.RefreshTokenFromCookieStrategy = exports.cookieExtractor = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const cookieExtractor = (req) => {
    if (req && req.cookies) {
        return req.cookies['refresh_token'];
    }
    return null;
};
exports.cookieExtractor = cookieExtractor;
let RefreshTokenFromCookieStrategy = class RefreshTokenFromCookieStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'refresh-jwt') {
    constructor() {
        super({
            jwtFromRequest: exports.cookieExtractor,
            secretOrKey: process.env.REFRESH_TOKEN_KEY,
            passReqToCallback: true,
        });
    }
    validate(req, payload) {
        const refreshToken = req.cookies.refresh_token;
        console.log('Hello from cookie');
        if (!refreshToken)
            throw new common_1.ForbiddenException("Refresh token noto'g'ri");
        return {
            ...payload,
            refreshToken
        };
    }
};
exports.RefreshTokenFromCookieStrategy = RefreshTokenFromCookieStrategy;
exports.RefreshTokenFromCookieStrategy = RefreshTokenFromCookieStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], RefreshTokenFromCookieStrategy);
//# sourceMappingURL=refresh_token_cookie.strategy.js.map