import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import z, { ZodType } from 'zod';
export declare class ZodValidationPipe<T extends ZodType<any, any, any>> implements PipeTransform {
    private schema;
    constructor(schema: T);
    transform(value: any, metadata: ArgumentMetadata): z.infer<T>;
    private formatZodErrors;
}
//# sourceMappingURL=ZodParserValidation.d.ts.map