"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
class PurchaseItemV1Schema extends pip_services3_commons_node_1.ObjectSchema {
    constructor() {
        super();
        this.withRequiredProperty('product_id', pip_services3_commons_node_2.TypeCode.String);
        this.withOptionalProperty('product_name', pip_services3_commons_node_2.TypeCode.String);
        this.withOptionalProperty('description', pip_services3_commons_node_2.TypeCode.String);
        this.withRequiredProperty('quantity', pip_services3_commons_node_2.TypeCode.Float);
        this.withRequiredProperty('price', pip_services3_commons_node_2.TypeCode.Float);
        this.withOptionalProperty('discount', pip_services3_commons_node_2.TypeCode.Float);
        this.withOptionalProperty('discount_price', pip_services3_commons_node_2.TypeCode.Float);
        this.withRequiredProperty('total', pip_services3_commons_node_2.TypeCode.Float);
    }
}
exports.PurchaseItemV1Schema = PurchaseItemV1Schema;
//# sourceMappingURL=PurchaseItemV1Schema.js.map