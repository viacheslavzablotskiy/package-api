import { BadRequestException } from '@nestjs/common';
export class ZodValidationPipe {
    constructor(schema) {
        this.schema = schema;
    }
    transform(value, metadata) {
        const paredValue = this.schema.safeParse(value);
        if (paredValue.success) {
            return paredValue.data;
        }
        throw new BadRequestException({
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
//# sourceMappingURL=ZodParserValidation.js.map