"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_commons_node_3 = require("pip-services3-commons-node");
const pip_services3_commons_node_4 = require("pip-services3-commons-node");
const pip_services3_commons_node_5 = require("pip-services3-commons-node");
const pip_services3_commons_node_6 = require("pip-services3-commons-node");
const pip_services3_commons_node_7 = require("pip-services3-commons-node");
const pip_services3_commons_node_8 = require("pip-services3-commons-node");
const PurchaseOrderV1Schema_1 = require("../data/version1/PurchaseOrderV1Schema");
class PurchaseOrdersCommandSet extends pip_services3_commons_node_1.CommandSet {
    constructor(logic) {
        super();
        this._logic = logic;
        // Register commands to the database
        this.addCommand(this.makeGetPurchaseOrdersCommand());
        this.addCommand(this.makeGetPurchaseOrderByIdCommand());
        this.addCommand(this.makeCreatePurchaseOrderCommand());
        this.addCommand(this.makeUpdatePurchaseOrderCommand());
        this.addCommand(this.makeDeletePurchaseOrderByIdCommand());
    }
    makeGetPurchaseOrdersCommand() {
        return new pip_services3_commons_node_2.Command("get_orders", new pip_services3_commons_node_5.ObjectSchema(true)
            .withOptionalProperty('filter', new pip_services3_commons_node_7.FilterParamsSchema())
            .withOptionalProperty('paging', new pip_services3_commons_node_8.PagingParamsSchema()), (correlationId, args, callback) => {
            let filter = pip_services3_commons_node_3.FilterParams.fromValue(args.get("filter"));
            let paging = pip_services3_commons_node_4.PagingParams.fromValue(args.get("paging"));
            this._logic.getOrders(correlationId, filter, paging, callback);
        });
    }
    makeGetPurchaseOrderByIdCommand() {
        return new pip_services3_commons_node_2.Command("get_order_by_id", new pip_services3_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('order_id', pip_services3_commons_node_6.TypeCode.String)
            .withRequiredProperty('customer_id', pip_services3_commons_node_6.TypeCode.String), (correlationId, args, callback) => {
            let orderId = args.getAsString("order_id");
            let customerId = args.getAsString("customer_id");
            this._logic.getOrderById(correlationId, orderId, customerId, callback);
        });
    }
    makeCreatePurchaseOrderCommand() {
        return new pip_services3_commons_node_2.Command("create_order", new pip_services3_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('order', new PurchaseOrderV1Schema_1.PurchaseOrderV1Schema()), (correlationId, args, callback) => {
            let order = args.get("order");
            this._logic.createOrder(correlationId, order, callback);
        });
    }
    makeUpdatePurchaseOrderCommand() {
        return new pip_services3_commons_node_2.Command("update_order", new pip_services3_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('order', new PurchaseOrderV1Schema_1.PurchaseOrderV1Schema()), (correlationId, args, callback) => {
            let order = args.get("order");
            this._logic.updateOrder(correlationId, order, callback);
        });
    }
    makeDeletePurchaseOrderByIdCommand() {
        return new pip_services3_commons_node_2.Command("delete_order_by_id", new pip_services3_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('order_id', pip_services3_commons_node_6.TypeCode.String)
            .withRequiredProperty('customer_id', pip_services3_commons_node_6.TypeCode.String), (correlationId, args, callback) => {
            let orderId = args.getAsNullableString("order_id");
            let customerId = args.getAsString("customer_id");
            this._logic.deleteOrderById(correlationId, orderId, customerId, callback);
        });
    }
}
exports.PurchaseOrdersCommandSet = PurchaseOrdersCommandSet;
//# sourceMappingURL=PurchaseOrdersCommandSet.js.map