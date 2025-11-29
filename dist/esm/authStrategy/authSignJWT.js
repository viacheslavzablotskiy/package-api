var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Injectable, Inject } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
let AuthCreationToken = class AuthCreationToken {
    constructor(jwtService, refreshTokenSecret) {
        this.jwtService = jwtService;
        this.refreshTokenSecret = refreshTokenSecret;
    }
    async creationAccessToken(user) {
        const payload = { sub: user.id, login: user.login };
        console.log('Data for creation token', payload);
        return {
            accessToken: await this.jwtService.signAsync(payload)
        };
    }
    async createtionRefreshToken(user) {
        const payload = { sub: user.id };
        console.log('Create refresh-token', payload);
        return {
            refreshToken: await this.jwtService.signAsync(payload, { expiresIn: '7d', secret: this.refreshTokenSecret })
        };
    }
    async getDataFromRefreshToken(refrechToken) {
        const payload = this.jwtService.verifyAsync(refrechToken, {
            secret: this.refreshTokenSecret
        });
        return payload;
    }
};
AuthCreationToken = __decorate([
    Injectable(),
    __param(1, Inject('JWT_REFRESH_SECRET')),
    __metadata("design:paramtypes", [JwtService, String])
], AuthCreationToken);
export { AuthCreationToken };
//# sourceMappingURL=authSignJWT.js.map