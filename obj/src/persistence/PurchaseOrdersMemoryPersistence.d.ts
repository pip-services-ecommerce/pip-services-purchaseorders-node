import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IdentifiableMemoryPersistence } from 'pip-services3-data-node';
import { PurchaseOrderV1 } from '../data/version1/PurchaseOrderV1';
import { IPurchaseOrdersPersistence } from './IPurchaseOrdersPersistence';
export declare class PurchaseOrdersMemoryPersistence extends IdentifiableMemoryPersistence<PurchaseOrderV1, string> implements IPurchaseOrdersPersistence {
    constructor();
    private contains;
    private composeFilter;
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<PurchaseOrderV1>) => void): void;
}
