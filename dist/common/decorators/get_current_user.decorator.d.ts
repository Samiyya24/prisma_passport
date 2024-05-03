import { JwtPayload } from '../../auth/types';
export declare const GetCurrentUser: (...dataOrPipes: (keyof JwtPayload | "refreshToken" | import("@nestjs/common").PipeTransform<any, any> | import("@nestjs/common").Type<import("@nestjs/common").PipeTransform<any, any>>)[]) => ParameterDecorator;
