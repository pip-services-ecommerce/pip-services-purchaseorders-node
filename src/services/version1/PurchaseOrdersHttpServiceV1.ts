import { Descriptor } from 'pip-services3-commons-node';
import { CommandableHttpService } from 'pip-services3-rpc-node';

export class PurchaseOrdersHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('v1/purchase_orders');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-purchaseorders', 'controller', 'default', '*', '1.0'));
    }
}