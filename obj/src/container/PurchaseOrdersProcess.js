"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_container_node_1 = require("pip-services3-container-node");
const PurchaseOrdersServiceFactory_1 = require("../build/PurchaseOrdersServiceFactory");
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
class PurchaseOrdersProcess extends pip_services3_container_node_1.ProcessContainer {
    constructor() {
        super("purchase_orders", "Purchase orders microservice");
        this._factories.add(new PurchaseOrdersServiceFactory_1.PurchaseOrdersServiceFactory);
        this._factories.add(new pip_services3_rpc_node_1.DefaultRpcFactory);
    }
}
exports.PurchaseOrdersProcess = PurchaseOrdersProcess;
//# sourceMappingURL=PurchaseOrdersProcess.js.map