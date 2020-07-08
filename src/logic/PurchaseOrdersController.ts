let async = require('async');

import { ConfigParams } from 'pip-services3-commons-node';
import { IConfigurable } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { IReferenceable } from 'pip-services3-commons-node';
import { DependencyResolver } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { ICommandable } from 'pip-services3-commons-node';
import { CommandSet } from 'pip-services3-commons-node';
import { BadRequestException } from 'pip-services3-commons-node';

import { PurchaseOrderV1 } from '../data/version1/PurchaseOrderV1';
import { PurchaseOrderStateV1 } from '../data/version1/PurchaseOrderStateV1';
import { IPurchaseOrdersPersistence } from '../persistence/IPurchaseOrdersPersistence';
import { IPurchaseOrdersController } from './IPurchaseOrdersController';
import { PurchaseOrdersCommandSet } from './PurchaseOrdersCommandSet';
import { UnauthorizedException } from 'pip-services3-commons-node/obj/src/errors/UnauthorizedException';

export class PurchaseOrdersController implements  IConfigurable, IReferenceable, ICommandable, IPurchaseOrdersController {
    private static _defaultConfig: ConfigParams = ConfigParams.fromTuples(
        'dependencies.persistence', 'pip-services-purchaseorders:persistence:*:*:1.0'
    );

    private _dependencyResolver: DependencyResolver = new DependencyResolver(PurchaseOrdersController._defaultConfig);
    private _persistence: IPurchaseOrdersPersistence;
    private _commandSet: PurchaseOrdersCommandSet;

    public configure(config: ConfigParams): void {
        this._dependencyResolver.configure(config);
    }

    public setReferences(references: IReferences): void {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired<IPurchaseOrdersPersistence>('persistence');
    }

    public getCommandSet(): CommandSet {
        if (this._commandSet == null)
            this._commandSet = new PurchaseOrdersCommandSet(this);
        return this._commandSet;
    }
    
    public getOrders(correlationId: string, filter: FilterParams, paging: PagingParams, 
        callback: (err: any, page: DataPage<PurchaseOrderV1>) => void): void {
        this._persistence.getPageByFilter(correlationId, filter, paging, callback);
    }

    public getOrderById(correlationId: string, id: string, customerId: string,
        callback: (err: any, order: PurchaseOrderV1) => void): void {
        this._persistence.getOneById(correlationId, id, (err, order) => {
            // Do not allow to access order of different customer
            if (order && order.customer_id != customerId)
                order = null;
            
            callback(err, order);
        });
    }

    public createOrder(correlationId: string, order: PurchaseOrderV1, 
        callback: (err: any, purchase_order: PurchaseOrderV1) => void): void {

        order.state = order.state || PurchaseOrderStateV1.New;
        order.create_time = new Date();
        order.update_time = new Date();

        this._persistence.create(correlationId, order, callback);
    }

    public updateOrder(correlationId: string, order: PurchaseOrderV1, 
        callback: (err: any, purchase_order: PurchaseOrderV1) => void): void {

        let newOrder: PurchaseOrderV1;

        order.state = order.state || PurchaseOrderStateV1.New;
        order.update_time = new Date();
    
        async.series([
            (callback) => {
                this._persistence.getOneById(correlationId, order.id, (err, data) => {
                    if (err == null && data && data.customer_id != order.customer_id) {
                        err = new BadRequestException(correlationId, 'WRONG_CUST_ID', 'Wrong purchase order customer id')
                            .withDetails('id', order.id)
                            .withDetails('customer_id', order.customer_id);
                    }
                    callback(err);
                });
            },
            (callback) => {
                this._persistence.update(correlationId, order, (err, data) => {
                    newOrder = data;
                    callback(err);
                });
            }
        ], (err) => {
            callback(err, newOrder);
        });
    }

    public deleteOrderById(correlationId: string, id: string, customerId: string,
        callback: (err: any, order: PurchaseOrderV1) => void): void {  

        let oldOrder: PurchaseOrderV1;

        async.series([
            (callback) => {
                this._persistence.getOneById(correlationId, id, (err, data) => {
                    if (err == null && data && data.customer_id != customerId) {
                        err = new BadRequestException(correlationId, 'WRONG_CUST_ID', 'Wrong purchase order customer id')
                            .withDetails('id', id)
                            .withDetails('customer_id', customerId);
                    }
                    callback(err);
                });
            },
            (callback) => {
                this._persistence.deleteById(correlationId, id, (err, data) => {
                    oldOrder = data;
                    callback(err);
                });
            }
        ], (err) => {
            if (callback) callback(err, oldOrder);
        });
    }

}
