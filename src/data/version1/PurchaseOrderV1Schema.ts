import { ObjectSchema } from 'pip-services3-commons-node';
import { ArraySchema } from 'pip-services3-commons-node';
import { TypeCode } from 'pip-services3-commons-node';
import { PurchaseItemV1Schema } from './PurchaseItemV1Schema';
import { ShippingDetailsV1Schema } from './ShippingDetailsV1Schema';

export class PurchaseOrderV1Schema extends ObjectSchema {
    public constructor() {
        super();
        this.withOptionalProperty('id', TypeCode.String);
        this.withOptionalProperty('number', TypeCode.String);
        this.withRequiredProperty('customer_id', TypeCode.String);
        this.withOptionalProperty('state', TypeCode.String);
        this.withOptionalProperty('state_details', TypeCode.String);

        this.withOptionalProperty('create_time', TypeCode.DateTime);
        this.withOptionalProperty('update_time', TypeCode.DateTime);
        this.withOptionalProperty('paid_time', TypeCode.DateTime);
        this.withOptionalProperty('refunded_time', TypeCode.DateTime);

        this.withOptionalProperty('payment_method_id', TypeCode.String);
        this.withOptionalProperty('payment_id', TypeCode.String);
        this.withOptionalProperty('shipping_details', new ShippingDetailsV1Schema());
        this.withOptionalProperty('items', new ArraySchema(new PurchaseItemV1Schema()));

        this.withOptionalProperty('subtotal', TypeCode.Float);
        this.withOptionalProperty('discount', TypeCode.Float);
        this.withOptionalProperty('discount_code', TypeCode.String);
        this.withOptionalProperty('shipping_cost', TypeCode.Float);
        this.withOptionalProperty('tax_percent', TypeCode.Float);
        this.withOptionalProperty('tax', TypeCode.Float);
        this.withOptionalProperty('other_cost', TypeCode.Float);
        this.withRequiredProperty('total', TypeCode.Float);
    }
}
