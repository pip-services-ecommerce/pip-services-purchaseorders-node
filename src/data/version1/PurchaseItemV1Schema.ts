import { ObjectSchema } from 'pip-services3-commons-node';
import { ArraySchema } from 'pip-services3-commons-node';
import { TypeCode } from 'pip-services3-commons-node';

export class PurchaseItemV1Schema extends ObjectSchema {
    public constructor() {
        super();
        this.withRequiredProperty('product_id', TypeCode.String);
        this.withOptionalProperty('description', TypeCode.String);
        this.withRequiredProperty('quantity', TypeCode.Float);
        this.withRequiredProperty('price', TypeCode.Float);
        this.withOptionalProperty('discount', TypeCode.Float);
        this.withOptionalProperty('discount_price', TypeCode.Float);
        this.withRequiredProperty('total', TypeCode.Float);
    }
}
