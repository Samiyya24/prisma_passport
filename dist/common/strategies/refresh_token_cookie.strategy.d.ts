/// <reference types="cookie-parser" />
import { JwtFromRequestFunction, Strategy } from 'passport-jwt';
import { JwtPayload, JwtPayloadWithRefreshToken } from '../../auth/types';
import { Request } from 'express';
export declare const cookieExtractor: JwtFromRequestFunction;
declare const RefreshTokenFromCookieStrategy_base: new (...args: any[]) => Strategy;
export declare class RefreshTokenFromCookieStrategy extends RefreshTokenFromCookieStrategy_base {
    constructor();
    validate(req: Request, payload: JwtPayload): JwtPayloadWithRefreshToken;
}
export {};
