import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IdentifiableMongoDbPersistence } from 'pip-services3-mongodb-node';
import { PurchaseOrderV1 } from '../data/version1/PurchaseOrderV1';
import { IPurchaseOrdersPersistence } from './IPurchaseOrdersPersistence';
export declare class PurchaseOrdersMongoDbPersistence extends IdentifiableMongoDbPersistence<PurchaseOrderV1, string> implements IPurchaseOrdersPersistence {
    constructor();
    private composeFilter;
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<PurchaseOrderV1>) => void): void;
}
