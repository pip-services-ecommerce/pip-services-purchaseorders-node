let _ = require('lodash');

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IdentifiableMemoryPersistence } from 'pip-services3-data-node';
import { TagsProcessor } from 'pip-services3-commons-node';

import { PurchaseOrderV1 } from '../data/version1/PurchaseOrderV1';
import { IPurchaseOrdersPersistence } from './IPurchaseOrdersPersistence';

export class PurchaseOrdersMemoryPersistence
    extends IdentifiableMemoryPersistence<PurchaseOrderV1, string>
    implements IPurchaseOrdersPersistence {

    constructor() {
        super();
    }

    private contains(array1, array2) {
        if (array1 == null || array2 == null) return false;

        for (let i1 = 0; i1 < array1.length; i1++) {
            for (let i2 = 0; i2 < array2.length; i2++)
                if (array1[i1] == array2[i1])
                    return true;
        }

        return false;
    }

    private composeFilter(filter: FilterParams): any {
        filter = filter || new FilterParams();

        let id = filter.getAsNullableString('id');
        let state = filter.getAsNullableString('state');
        let customerId = filter.getAsNullableString('customer_id');
        let ids = filter.getAsObject('ids');
        let createdFrom = filter.getAsNullableDateTime('created_from');
        let createdTo = filter.getAsNullableDateTime('created_to');
        let productId = filter.getAsNullableString('product_id');

        // Process ids filter
        if (_.isString(ids))
            ids = ids.split(',');
        if (!_.isArray(ids))
            ids = null;

        return (item: PurchaseOrderV1) => {
            if (id && item.id != id)
                return false;
            if (ids && _.indexOf(ids, item.id) < 0)
                return false;
            if (state && item.state != state)
                return false;
            if (customerId && item.customer_id != customerId)
                return false;
            if (createdFrom && item.create_time && item.create_time < createdFrom)
                return false;
            if (createdTo && item.create_time && item.create_time > createdTo)
                return false;
            if (productId && item.items && item.items.filter(x => x.product_id == productId).length == 0)
                return false;
                
            return true;
        };
    }

    public getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<PurchaseOrderV1>) => void): void {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null, callback);
    }

}
