/// <reference types="cookie-parser" />
import { Strategy } from 'passport-jwt';
import { JwtPayload, JwtPayloadWithRefreshToken } from '../../auth/types';
import { Request } from 'express';
declare const RefreshTokenFromBearerStrategy_base: new (...args: any[]) => Strategy;
export declare class RefreshTokenFromBearerStrategy extends RefreshTokenFromBearerStrategy_base {
    constructor();
    validate(req: Request, payload: JwtPayload): JwtPayloadWithRefreshToken;
}
export {};
