import { ExecutionContext } from "@nestjs/common";
declare const JWTAuthGuard_base: any;
export declare class JWTAuthGuard extends JWTAuthGuard_base {
    handleRequest<TUser = any>(err: any, user: any, info: any, context: ExecutionContext, status?: any): TUser;
}
export {};
