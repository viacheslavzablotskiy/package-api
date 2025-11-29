"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZodValidationPipe = void 0;
const common_1 = require("@nestjs/common");
class ZodValidationPipe {
    constructor(schema) {
        this.schema = schema;
    }
    transform(value, metadata) {
        const paredValue = this.schema.safeParse(value);
        if (paredValue.success) {
            return paredValue.data;
        }
        throw new common_1.BadRequestException({
            source: metadata.type,
            errors: this.formatZodErrors(paredValue.error)
        });
    }
    formatZodErrors(error) {
        const fieldErrors = {};
        const formattedData = error.format();
        for (const [key, entry] of Object.entries(formattedData)) {
            if (key === '_errors')
                continue;
            if (entry && entry._errors.length > 0) {
                fieldErrors[key] = entry._errors;
            }
        }
        return fieldErrors;
    }
}
exports.ZodValidationPipe = ZodValidationPipe;
// {
// _errors: [],
// login: { _errors: ["String must contain at least 1 character(s)"] },
// email: { _errors: ["Invalid email"] },
// password: { _errors: ["String must contain at least 6 character(s)"] },
// passwordConfirm: { _errors: ["Passwords do not match"] }
// }
// we have this type take and give as [string, {_errors: string[]}][]
