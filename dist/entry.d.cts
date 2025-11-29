import { ArgumentMetadata, DynamicModule, ExecutionContext, PipeTransform } from "@nestjs/common";
import z, { ZodType } from "zod";
import * as _nestjs_passport0 from "@nestjs/passport";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

//#region src/ZodPipe/ZodParserValidation.d.ts
declare class ZodValidationPipe<T extends ZodType<any, any, any>> implements PipeTransform {
  private schema;
  constructor(schema: T);
  transform(value: any, metadata: ArgumentMetadata): z.infer<T>;
  private formatZodErrors;
}
//#endregion
//#region src/authStrategy/authStrategy.module.d.ts
declare class AuthStragetyModule {
  static registerAsync(options: {
    inject: any[];
    useFactory: (...args: any[]) => {
      refrechTokenSecret: string;
    };
  }): DynamicModule;
}
//#endregion
//#region src/authStrategy/authJWTGuard.d.ts
declare const JWTAuthGuard_base: _nestjs_passport0.Type<_nestjs_passport0.IAuthGuard>;
declare class JWTAuthGuard extends JWTAuthGuard_base {
  handleRequest<TUser = any>(err: any, user: any, info: any, context: ExecutionContext, status?: any): TUser;
}
//#endregion
//#region src/authStrategy/authSignJWT.d.ts
declare class AuthCreationToken {
  private jwtService;
  private readonly refreshTokenSecret;
  constructor(jwtService: JwtService, refreshTokenSecret: string);
  creationAccessToken(user: {
    id: number;
    login: string;
  }): Promise<{
    accessToken: string;
  }>;
  createtionRefreshToken(user: {
    id: number;
    login: string;
  }): Promise<{
    refreshToken: string;
  }>;
  getDataFromRefreshToken(refrechToken: string): Promise<{
    id: number;
    login: string;
  }>;
}
//#endregion
//#region src/authStrategy/authStrategy.guard.d.ts
declare const AuthGuardStrategy_base: new (...args: any) => any;
declare class AuthGuardStrategy extends AuthGuardStrategy_base {
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
//#endregion
export { AuthCreationToken, AuthGuardStrategy, AuthStragetyModule, JWTAuthGuard, ZodValidationPipe };
//# sourceMappingURL=entry.d.cts.map