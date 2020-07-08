"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_commons_node_3 = require("pip-services3-commons-node");
const PurchaseItemV1Schema_1 = require("./PurchaseItemV1Schema");
const ShippingDetailsV1Schema_1 = require("./ShippingDetailsV1Schema");
class PurchaseOrderV1Schema extends pip_services3_commons_node_1.ObjectSchema {
    constructor() {
        super();
        this.withOptionalProperty('id', pip_services3_commons_node_3.TypeCode.String);
        this.withOptionalProperty('number', pip_services3_commons_node_3.TypeCode.String);
        this.withRequiredProperty('customer_id', pip_services3_commons_node_3.TypeCode.String);
        this.withOptionalProperty('state', pip_services3_commons_node_3.TypeCode.String);
        this.withOptionalProperty('state_details', pip_services3_commons_node_3.TypeCode.String);
        this.withRequiredProperty('currency_code', pip_services3_commons_node_3.TypeCode.String);
        this.withOptionalProperty('create_time', pip_services3_commons_node_3.TypeCode.DateTime);
        this.withOptionalProperty('update_time', pip_services3_commons_node_3.TypeCode.DateTime);
        this.withOptionalProperty('paid_time', pip_services3_commons_node_3.TypeCode.DateTime);
        this.withOptionalProperty('refunded_time', pip_services3_commons_node_3.TypeCode.DateTime);
        this.withOptionalProperty('payment_method_id', pip_services3_commons_node_3.TypeCode.String);
        this.withOptionalProperty('payment_id', pip_services3_commons_node_3.TypeCode.String);
        this.withOptionalProperty('shipping_details', new ShippingDetailsV1Schema_1.ShippingDetailsV1Schema());
        this.withOptionalProperty('items', new pip_services3_commons_node_2.ArraySchema(new PurchaseItemV1Schema_1.PurchaseItemV1Schema()));
        this.withOptionalProperty('subtotal', pip_services3_commons_node_3.TypeCode.Float);
        this.withOptionalProperty('discount', pip_services3_commons_node_3.TypeCode.Float);
        this.withOptionalProperty('discount_code', pip_services3_commons_node_3.TypeCode.String);
        this.withOptionalProperty('shipping_cost', pip_services3_commons_node_3.TypeCode.Float);
        this.withOptionalProperty('tax_percent', pip_services3_commons_node_3.TypeCode.Float);
        this.withOptionalProperty('tax', pip_services3_commons_node_3.TypeCode.Float);
        this.withOptionalProperty('other_cost', pip_services3_commons_node_3.TypeCode.Float);
        this.withRequiredProperty('total', pip_services3_commons_node_3.TypeCode.Float);
    }
}
exports.PurchaseOrderV1Schema = PurchaseOrderV1Schema;
//# sourceMappingURL=PurchaseOrderV1Schema.js.map