import { DynamicModule } from '@nestjs/common';
export declare class AuthStragetyModule {
    static registerAsync(options: {
        inject: any[];
        useFactory: (...args: any[]) => {
            refrechTokenSecret: string;
        };
    }): DynamicModule;
}
//# sourceMappingURL=authStrategy.module.d.ts.map