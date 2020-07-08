import { IReferences } from 'pip-services3-commons-node';
import { ProcessContainer } from 'pip-services3-container-node';

import { PurchaseOrdersServiceFactory } from '../build/PurchaseOrdersServiceFactory';
import { DefaultRpcFactory } from 'pip-services3-rpc-node';

export class PurchaseOrdersProcess extends ProcessContainer {

    public constructor() {
        super("purchase_orders", "Purchase orders microservice");
        this._factories.add(new PurchaseOrdersServiceFactory);
        this._factories.add(new DefaultRpcFactory);
    }

}
