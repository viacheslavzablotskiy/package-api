import { ConfigService } from '@nestjs/config';
declare const AuthGuardStrategy_base: new (...args: any) => any;
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
//# sourceMappingURL=authStrategy.guard.d.ts.map