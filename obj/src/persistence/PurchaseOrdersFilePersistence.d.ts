import { ConfigParams } from 'pip-services3-commons-node';
import { JsonFilePersister } from 'pip-services3-data-node';
import { PurchaseOrdersMemoryPersistence } from './PurchaseOrdersMemoryPersistence';
import { PurchaseOrderV1 } from '../data/version1/PurchaseOrderV1';
export declare class PurchaseOrdersFilePersistence extends PurchaseOrdersMemoryPersistence {
    protected _persister: JsonFilePersister<PurchaseOrderV1>;
    constructor(path?: string);
    configure(config: ConfigParams): void;
}
