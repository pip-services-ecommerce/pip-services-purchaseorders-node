// import { Descriptor } from 'pip-services3-commons-node';
// import { CommandableLambdaFunction } from 'pip-services3-aws-node';
// import { PurchaseOrdersServiceFactory } from '../build/PurchaseOrdersServiceFactory';

// export class PurchaseOrdersLambdaFunction extends CommandableLambdaFunction {
//     public constructor() {
//         super("purchase_orders", "Purchase orders function");
//         this._dependencyResolver.put('controller', new Descriptor('pip-services-purchaseorders', 'controller', 'default', '*', '*'));
//         this._factories.add(new PurchaseOrdersServiceFactory());
//     }
// }

// export const handler = new PurchaseOrdersLambdaFunction().getHandler();