import { CommandSet } from 'pip-services3-commons-node';
import { IPurchaseOrdersController } from './IPurchaseOrdersController';
export declare class PurchaseOrdersCommandSet extends CommandSet {
    private _logic;
    constructor(logic: IPurchaseOrdersController);
    private makeGetPurchaseOrdersCommand;
    private makeGetPurchaseOrderByIdCommand;
    private makeCreatePurchaseOrderCommand;
    private makeUpdatePurchaseOrderCommand;
    private makeDeletePurchaseOrderByIdCommand;
}
