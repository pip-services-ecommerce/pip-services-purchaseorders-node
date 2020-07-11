let _ = require('lodash');

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IdentifiableMongoDbPersistence } from 'pip-services3-mongodb-node';

import { PurchaseOrderV1 } from '../data/version1/PurchaseOrderV1';
import { IPurchaseOrdersPersistence } from './IPurchaseOrdersPersistence';

export class PurchaseOrdersMongoDbPersistence
    extends IdentifiableMongoDbPersistence<PurchaseOrderV1, string>
    implements IPurchaseOrdersPersistence {

    constructor() {
        super('purchase_orders');
        super.ensureIndex({ customer_id: 1 });
    }

    private composeFilter(filter: any) {
        filter = filter || new FilterParams();

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

        return criteria.length > 0 ? { $and: criteria } : null;
    }

    public getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<PurchaseOrderV1>) => void): void {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null, callback);
    }

}
