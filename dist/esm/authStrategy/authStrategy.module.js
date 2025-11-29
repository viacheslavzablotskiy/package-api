var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AuthStragetyModule_1;
import { Module } from '@nestjs/common';
import { AuthCreationToken } from './authSignJWT';
import { AuthGuardStrategy } from './authStrategy.guard';
let AuthStragetyModule = AuthStragetyModule_1 = class AuthStragetyModule {
    static registerAsync(options) {
        return {
            module: AuthStragetyModule_1,
            providers: [AuthCreationToken, AuthGuardStrategy,
                {
                    provide: 'JWT_REFRESH_SECRET',
                    inject: options.inject,
                    useFactory: (...args) => options.useFactory(...args).refrechTokenSecret
                }
            ],
            controllers: [],
            exports: [AuthCreationToken, AuthGuardStrategy],
        };
    }
};
AuthStragetyModule = AuthStragetyModule_1 = __decorate([
    Module({})
], AuthStragetyModule);
export { AuthStragetyModule };
//# sourceMappingURL=authStrategy.module.js.map