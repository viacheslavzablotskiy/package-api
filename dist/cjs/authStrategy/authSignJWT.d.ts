import { JwtService } from '@nestjs/jwt';
export declare class AuthCreationToken {
    private jwtService;
    private readonly refreshTokenSecret;
    constructor(jwtService: JwtService, refreshTokenSecret: string);
    creationAccessToken(user: {
        id: number;
        login: string;
    }): Promise<{
        accessToken: any;
    }>;
    createtionRefreshToken(user: {
        id: number;
        login: string;
    }): Promise<{
        refreshToken: any;
    }>;
    getDataFromRefreshToken(refrechToken: string): Promise<{
        id: number;
        login: string;
    }>;
}
