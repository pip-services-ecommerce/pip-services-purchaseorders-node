import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IGetter } from 'pip-services3-data-node';
import { IWriter } from 'pip-services3-data-node';
import { PurchaseOrderV1 } from '../data/version1/PurchaseOrderV1';
export interface IPurchaseOrdersPersistence extends IGetter<PurchaseOrderV1, string>, IWriter<PurchaseOrderV1, string> {
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<PurchaseOrderV1>) => void): void;
    getOneById(correlationId: string, id: string, callback: (err: any, item: PurchaseOrderV1) => void): void;
    create(correlationId: string, item: PurchaseOrderV1, callback: (err: any, item: PurchaseOrderV1) => void): void;
    update(correlationId: string, item: PurchaseOrderV1, callback: (err: any, item: PurchaseOrderV1) => void): void;
    deleteById(correlationId: string, id: string, callback: (err: any, item: PurchaseOrderV1) => void): void;
}
