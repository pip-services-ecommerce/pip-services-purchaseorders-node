"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_mongodb_node_1 = require("pip-services3-mongodb-node");
class PurchaseOrdersMongoDbPersistence extends pip_services3_mongodb_node_1.IdentifiableMongoDbPersistence {
    constructor() {
        super('purchase_orders');
        super.ensureIndex({ customer_id: 1 });
    }
    composeFilter(filter) {
        filter = filter || new pip_services3_commons_node_1.FilterParams();
        let criteria = [];
        let id = filter.getAsNullableString('id');
        if (id != null)
            criteria.push({ _id: id });
        // Filter ids
        let ids = filter.getAsObject('ids');
        if (_.isString(ids))
            ids = ids.split(',');
        if (_.isArray(ids))
            criteria.push({ _id: { $in: ids } });
        let state = filter.getAsNullableString('state');
        if (state != null)
            criteria.push({ state: state });
        let customerId = filter.getAsNullableString('customer_id');
        if (customerId != null)
            criteria.push({ customer_id: customerId });
        let createdFrom = filter.getAsNullableDateTime('created_from');
        if (createdFrom != null)
            criteria.push({ create_time: { $gte: createdFrom } });
        let createdTo = filter.getAsNullableDateTime('created_to');
        if (createdTo != null)
            criteria.push({ create_time: { $lte: createdTo } });
        let productId = filter.getAsNullableString('product_id');
        if (productId != null)
            criteria.push({
                items: {
                    $elemMatch: {
                        product_id: productId
                    }
                }
            });
        return criteria.length > 0 ? { $and: criteria } : null;
    }
    getPageByFilter(correlationId, filter, paging, callback) {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null, callback);
    }
}
exports.PurchaseOrdersMongoDbPersistence = PurchaseOrdersMongoDbPersistence;
//# sourceMappingURL=PurchaseOrdersMongoDbPersistence.js.map