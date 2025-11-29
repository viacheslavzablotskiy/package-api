let __nestjs_common = require("@nestjs/common");
let __nestjs_jwt = require("@nestjs/jwt");
let __nestjs_passport = require("@nestjs/passport");
let passport_jwt = require("passport-jwt");
let __nestjs_config = require("@nestjs/config");

//#region src/ZodPipe/ZodParserValidation.ts
var ZodValidationPipe = class {
	constructor(schema) {
		this.schema = schema;
	}
	transform(value, metadata) {
		const paredValue = this.schema.safeParse(value);
		if (paredValue.success) return paredValue.data;
		throw new __nestjs_common.BadRequestException({
			source: metadata.type,
			errors: this.formatZodErrors(paredValue.error)
		});
	}
	formatZodErrors(error) {
		const fieldErrors = {};
		const formattedData = error.format();
		for (const [key, entry] of Object.entries(formattedData)) {
			if (key === "_errors") continue;
			if (entry && entry._errors.length > 0) fieldErrors[key] = entry._errors;
		}
		return fieldErrors;
	}
};

//#endregion
//#region \0@oxc-project+runtime@0.98.0/helpers/decorateMetadata.js
function __decorateMetadata(k, v) {
	if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}

//#endregion
//#region \0@oxc-project+runtime@0.98.0/helpers/decorateParam.js
function __decorateParam(paramIndex, decorator) {
	return function(target, key) {
		decorator(target, key, paramIndex);
	};
}

//#endregion
//#region \0@oxc-project+runtime@0.98.0/helpers/decorate.js
function __decorate(decorators, target, key, desc) {
	var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	return c > 3 && r && Object.defineProperty(target, key, r), r;
}

//#endregion
//#region src/authStrategy/authSignJWT.ts
var _ref$1;
let AuthCreationToken = class AuthCreationToken$1 {
	constructor(jwtService, refreshTokenSecret) {
		this.jwtService = jwtService;
		this.refreshTokenSecret = refreshTokenSecret;
	}
	async creationAccessToken(user) {
		const payload = {
			sub: user.id,
			login: user.login
		};
		console.log("Data for creation token", payload);
		return { accessToken: await this.jwtService.signAsync(payload) };
	}
	async createtionRefreshToken(user) {
		const payload = { sub: user.id };
		console.log("Create refresh-token", payload);
		return { refreshToken: await this.jwtService.signAsync(payload, {
			expiresIn: "7d",
			secret: this.refreshTokenSecret
		}) };
	}
	async getDataFromRefreshToken(refrechToken) {
		return this.jwtService.verifyAsync(refrechToken, { secret: this.refreshTokenSecret });
	}
};
AuthCreationToken = __decorate([
	(0, __nestjs_common.Injectable)(),
	__decorateParam(1, (0, __nestjs_common.Inject)("JWT_REFRESH_SECRET")),
	__decorateMetadata("design:paramtypes", [typeof (_ref$1 = typeof __nestjs_jwt.JwtService !== "undefined" && __nestjs_jwt.JwtService) === "function" ? _ref$1 : Object, String])
], AuthCreationToken);

//#endregion
//#region src/authStrategy/authStrategy.guard.ts
var _ref;
let AuthGuardStrategy = class AuthGuardStrategy$1 extends (0, __nestjs_passport.PassportStrategy)(passport_jwt.Strategy, "jwt") {
	constructor(configService) {
		super({
			jwtFromRequest: passport_jwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: configService.get("JWT_SECRET") || ""
		});
	}
	async validate(payload) {
		console.log("Data we get from reqeust token", payload);
		return {
			userId: payload.sub,
			login: payload.login,
			role: payload.role
		};
	}
};
AuthGuardStrategy = __decorate([(0, __nestjs_common.Injectable)(), __decorateMetadata("design:paramtypes", [typeof (_ref = typeof __nestjs_config.ConfigService !== "undefined" && __nestjs_config.ConfigService) === "function" ? _ref : Object])], AuthGuardStrategy);

//#endregion
//#region src/authStrategy/authStrategy.module.ts
var _AuthStragetyModule;
let AuthStragetyModule = _AuthStragetyModule = class AuthStragetyModule$1 {
	static registerAsync(options) {
		return {
			module: _AuthStragetyModule,
			providers: [
				AuthCreationToken,
				AuthGuardStrategy,
				{
					provide: "JWT_REFRESH_SECRET",
					inject: options.inject,
					useFactory: (...args) => options.useFactory(...args).refrechTokenSecret
				}
			],
			controllers: [],
			exports: [AuthCreationToken, AuthGuardStrategy]
		};
	}
};
AuthStragetyModule = _AuthStragetyModule = __decorate([(0, __nestjs_common.Module)({})], AuthStragetyModule);

//#endregion
//#region src/authStrategy/authJWTGuard.ts
let JWTAuthGuard = class JWTAuthGuard$1 extends (0, __nestjs_passport.AuthGuard)("jwt") {
	handleRequest(err, user, info, context, status) {
		if (err || !user) throw err || new __nestjs_common.UnauthorizedException("Token is not validate");
		return user;
	}
};
JWTAuthGuard = __decorate([(0, __nestjs_common.Injectable)()], JWTAuthGuard);

//#endregion
Object.defineProperty(exports, 'AuthCreationToken', {
  enumerable: true,
  get: function () {
    return AuthCreationToken;
  }
});
Object.defineProperty(exports, 'AuthGuardStrategy', {
  enumerable: true,
  get: function () {
    return AuthGuardStrategy;
  }
});
Object.defineProperty(exports, 'AuthStragetyModule', {
  enumerable: true,
  get: function () {
    return AuthStragetyModule;
  }
});
Object.defineProperty(exports, 'JWTAuthGuard', {
  enumerable: true,
  get: function () {
    return JWTAuthGuard;
  }
});
exports.ZodValidationPipe = ZodValidationPipe;