let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';

import { PurchaseOrderV1 } from '../../src/data/version1/PurchaseOrderV1';
import { PurchaseOrderStateV1 } from '../../src/data/version1/PurchaseOrderStateV1';

import { IPurchaseOrdersPersistence } from '../../src/persistence/IPurchaseOrdersPersistence';
import { TestModel } from '../data/TestModel';

let ORDER1: PurchaseOrderV1 = TestModel.createPurchaseOrder1();
let ORDER2: PurchaseOrderV1 = TestModel.createPurchaseOrder2();
let ORDER3: PurchaseOrderV1 = TestModel.createPurchaseOrder3();

export class PurchaseOrdersPersistenceFixture {
    private _persistence: IPurchaseOrdersPersistence;

    constructor(persistence) {
        assert.isNotNull(persistence);
        this._persistence = persistence;
    }

    private testCreatePurchaseOrders(done) {
        async.series([
            // Create one purchase order
            (callback) => {
                this._persistence.create(
                    null,
                    ORDER1,
                    (err, purchaseOrder) => {
                        assert.isNull(err);

                        assert.isObject(purchaseOrder);
                        TestModel.assertEqualPurchaseOrder(purchaseOrder, ORDER1);

                        callback();
                    }
                );
            },
            // Create another purchase order
            (callback) => {
                this._persistence.create(
                    null,
                    ORDER2,
                    (err, purchaseOrder) => {
                        assert.isNull(err);

                        assert.isObject(purchaseOrder);
                        TestModel.assertEqualPurchaseOrder(purchaseOrder, ORDER2);

                        callback();
                    }
                );
            },
            // Create yet another purchase order
            (callback) => {
                this._persistence.create(
                    null,
                    ORDER3,
                    (err, purchaseOrder) => {
                        assert.isNull(err);

                        assert.isObject(purchaseOrder);
                        TestModel.assertEqualPurchaseOrder(purchaseOrder, ORDER3);

                        callback();
                    }
                );
            }
        ], done);
    }

    testCrudOperations(done) {
        let purchaseOrder1: PurchaseOrderV1;

        async.series([
            // Create items
            (callback) => {
                this.testCreatePurchaseOrders(callback);
            },
            // Get all purchase orders
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    new FilterParams(),
                    new PagingParams(),
                    (err, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 3);

                        purchaseOrder1 = page.data[0];

                        callback();
                    }
                );
            },
            // Update the purchase order
            (callback) => {
                purchaseOrder1.state = PurchaseOrderStateV1.Paid;

                this._persistence.update(
                    null,
                    purchaseOrder1,
                    (err, purchaseOrder) => {
                        assert.isNull(err);

                        assert.isObject(purchaseOrder);
                        assert.equal(purchaseOrder.state, PurchaseOrderStateV1.Paid);

                        purchaseOrder1 = purchaseOrder;

                        callback();
                    }
                );
            },
            // Delete purchase order
            (callback) => {
                this._persistence.deleteById(
                    null,
                    purchaseOrder1.id,
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
            // Try to get delete purchase order
            (callback) => {
                this._persistence.getOneById(
                    null,
                    purchaseOrder1.id,
                    (err, purchaseOrder) => {
                        assert.isNull(err);

                        assert.isNull(purchaseOrder || null);

                        callback();
                    }
                );
            }
        ], done);
    }

    testGetWithFilter(done) {
        async.series([
            // Create purchase orders
            (callback) => {
                this.testCreatePurchaseOrders(callback);
            },
            // Get purchase orders filtered by customer id
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromValue({
                        customer_id: '1'
                    }),
                    new PagingParams(),
                    (err, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 2);

                        callback();
                    }
                );
            },
            // Get purchase orders by state
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromValue({
                        state: PurchaseOrderStateV1.Paid
                    }),
                    new PagingParams(),
                    (err, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 1);

                        callback();
                    }
                );
            },
            // Get purchase orders by ids
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromValue({
                        ids: ['1', '3']
                    }),
                    new PagingParams(),
                    (err, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 2);

                        callback();
                    }
                );
            },
        ], done);
    }

}
