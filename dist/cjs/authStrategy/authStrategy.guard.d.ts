import { ConfigService } from '@nestjs/config';
declare const AuthGuardStrategy_base: any;
export declare class AuthGuardStrategy extends AuthGuardStrategy_base {
    constructor(configService: ConfigService);
    validate(payload: {
        sub: number;
        login: string;
        role: string;
    }): Promise<{
        userId: number;
        login: string;
        role: string;
    }>;
}
export {};
