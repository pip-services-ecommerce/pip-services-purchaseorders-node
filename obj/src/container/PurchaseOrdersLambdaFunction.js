"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_aws_node_1 = require("pip-services3-aws-node");
const PurchaseOrdersServiceFactory_1 = require("../build/PurchaseOrdersServiceFactory");
class PurchaseOrdersLambdaFunction extends pip_services3_aws_node_1.CommandableLambdaFunction {
    constructor() {
        super("purchase_orders", "Purchase orders function");
        this._dependencyResolver.put('controller', new pip_services3_commons_node_1.Descriptor('pip-services-purchaseorders', 'controller', 'default', '*', '*'));
        this._factories.add(new PurchaseOrdersServiceFactory_1.PurchaseOrdersServiceFactory());
    }
}
exports.PurchaseOrdersLambdaFunction = PurchaseOrdersLambdaFunction;
exports.handler = new PurchaseOrdersLambdaFunction().getHandler();
//# sourceMappingURL=PurchaseOrdersLambdaFunction.js.map