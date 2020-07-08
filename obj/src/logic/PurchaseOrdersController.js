"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let async = require('async');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_commons_node_3 = require("pip-services3-commons-node");
const PurchaseOrderStateV1_1 = require("../data/version1/PurchaseOrderStateV1");
const PurchaseOrdersCommandSet_1 = require("./PurchaseOrdersCommandSet");
class PurchaseOrdersController {
    constructor() {
        this._dependencyResolver = new pip_services3_commons_node_2.DependencyResolver(PurchaseOrdersController._defaultConfig);
    }
    configure(config) {
        this._dependencyResolver.configure(config);
    }
    setReferences(references) {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired('persistence');
    }
    getCommandSet() {
        if (this._commandSet == null)
            this._commandSet = new PurchaseOrdersCommandSet_1.PurchaseOrdersCommandSet(this);
        return this._commandSet;
    }
    getOrders(correlationId, filter, paging, callback) {
        this._persistence.getPageByFilter(correlationId, filter, paging, callback);
    }
    getOrderById(correlationId, id, customerId, callback) {
        this._persistence.getOneById(correlationId, id, (err, order) => {
            // Do not allow to access order of different customer
            if (order && order.customer_id != customerId)
                order = null;
            callback(err, order);
        });
    }
    createOrder(correlationId, order, callback) {
        order.state = order.state || PurchaseOrderStateV1_1.PurchaseOrderStateV1.New;
        order.create_time = new Date();
        order.update_time = new Date();
        this._persistence.create(correlationId, order, callback);
    }
    updateOrder(correlationId, order, callback) {
        let newOrder;
        order.state = order.state || PurchaseOrderStateV1_1.PurchaseOrderStateV1.New;
        order.update_time = new Date();
        async.series([
            (callback) => {
                this._persistence.getOneById(correlationId, order.id, (err, data) => {
                    if (err == null && data && data.customer_id != order.customer_id) {
                        err = new pip_services3_commons_node_3.BadRequestException(correlationId, 'WRONG_CUST_ID', 'Wrong purchase order customer id')
                            .withDetails('id', order.id)
                            .withDetails('customer_id', order.customer_id);
                    }
                    callback(err);
                });
            },
            (callback) => {
                this._persistence.update(correlationId, order, (err, data) => {
                    newOrder = data;
                    callback(err);
                });
            }
        ], (err) => {
            callback(err, newOrder);
        });
    }
    deleteOrderById(correlationId, id, customerId, callback) {
        let oldOrder;
        async.series([
            (callback) => {
                this._persistence.getOneById(correlationId, id, (err, data) => {
                    if (err == null && data && data.customer_id != customerId) {
                        err = new pip_services3_commons_node_3.BadRequestException(correlationId, 'WRONG_CUST_ID', 'Wrong purchase order customer id')
                            .withDetails('id', id)
                            .withDetails('customer_id', customerId);
                    }
                    callback(err);
                });
            },
            (callback) => {
                this._persistence.deleteById(correlationId, id, (err, data) => {
                    oldOrder = data;
                    callback(err);
                });
            }
        ], (err) => {
            if (callback)
                callback(err, oldOrder);
        });
    }
}
exports.PurchaseOrdersController = PurchaseOrdersController;
PurchaseOrdersController._defaultConfig = pip_services3_commons_node_1.ConfigParams.fromTuples('dependencies.persistence', 'pip-services-purchaseorders:persistence:*:*:1.0');
//# sourceMappingURL=PurchaseOrdersController.js.map