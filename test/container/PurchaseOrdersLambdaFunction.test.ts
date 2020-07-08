let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { Descriptor } from 'pip-services3-commons-node';
import { ConfigParams } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';
import { ConsoleLogger } from 'pip-services3-components-node';

import { PurchaseOrderV1 } from '../../src/data/version1/PurchaseOrderV1';
import { PurchaseOrderStateV1 } from '../../src/data/version1/PurchaseOrderStateV1';
import { PurchaseOrdersMemoryPersistence } from '../../src/persistence/PurchaseOrdersMemoryPersistence';
import { PurchaseOrdersController } from '../../src/logic/PurchaseOrdersController';
import { PurchaseOrdersLambdaFunction } from '../../src/container/PurchaseOrdersLambdaFunction';
import { TestModel } from '../data/TestModel';

let ORDER1: PurchaseOrderV1 = TestModel.createPurchaseOrder1();
let ORDER2: PurchaseOrderV1 = TestModel.createPurchaseOrder2();

suite('PurchaseOrdersLambdaFunction', () => {
    let lambda: PurchaseOrdersLambdaFunction;

    suiteSetup((done) => {
        let config = ConfigParams.fromTuples(
            'logger.descriptor', 'pip-services:logger:console:default:1.0',
            'persistence.descriptor', 'pip-services-purchaseorders:persistence:memory:default:1.0',
            'controller.descriptor', 'pip-services-purchaseorders:controller:default:default:1.0'
        );

        lambda = new PurchaseOrdersLambdaFunction();
        lambda.configure(config);
        lambda.open(null, done);
    });

    suiteTeardown((done) => {
        lambda.close(null, done);
    });

    test('CRUD Operations', (done) => {
        var purchaseOrder1, purchaseOrder2: PurchaseOrderV1;

        async.series([
            // Create one purchase order
            (callback) => {
                lambda.act(
                    {
                        role: 'purchase_orders',
                        cmd: 'create_order',
                        order: ORDER1
                    },
                    (err, purchaseOrder) => {
                        assert.isNull(err);

                        assert.isObject(purchaseOrder);

                        TestModel.assertEqualPurchaseOrder(purchaseOrder, ORDER1);

                        purchaseOrder1 = purchaseOrder;

                        callback();
                    }
                );
            },
            // Create another purchase order
            (callback) => {
                lambda.act(
                    {
                        role: 'purchase_orders',
                        cmd: 'create_order',
                        order: ORDER2
                    },
                    (err, purchaseOrder) => {
                        assert.isNull(err);

                        assert.isObject(purchaseOrder);

                        TestModel.assertEqualPurchaseOrder(purchaseOrder, ORDER2);

                        purchaseOrder2 = purchaseOrder;

                        callback();
                    }
                );
            },
            // Get all purchase orders
            (callback) => {
                lambda.act(
                    {
                        role: 'purchase_orders',
                        cmd: 'get_orders'
                    },
                    (err, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 2);

                        callback();
                    }
                );
            },
            // Update the purchase order
            (callback) => {
                purchaseOrder1.state = PurchaseOrderStateV1.Paid;

                lambda.act(
                    {
                        role: 'purchase_orders',
                        cmd: 'update_order',
                        order: purchaseOrder1
                    },
                    (err, purchaseOrder) => {
                        assert.isNull(err);

                        assert.isObject(purchaseOrder);
                        assert.equal(purchaseOrder.state, PurchaseOrderStateV1.Paid);
                        assert.equal(purchaseOrder.id, ORDER1.id);

                        purchaseOrder1 = purchaseOrder;

                        callback();
                    }
                );
            },
            // Delete purchase order
            (callback) => {
                lambda.act(
                    {
                        role: 'purchase_orders',
                        cmd: 'delete_order_by_id',
                        order_id: purchaseOrder1.id,
                        customer_id: purchaseOrder1.customer_id
                    },
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
            // Try to get delete purchase order
            (callback) => {
                lambda.act(
                    {
                        role: 'purchase_orders',
                        cmd: 'get_order_by_id',
                        order_id: purchaseOrder1.id,
                        customer_id: purchaseOrder1.customer_id
                    },
                    (err, purchaseOrder) => {
                        assert.isNull(err);

                        assert.isNull(purchaseOrder || null);

                        callback();
                    }
                );
            }
        ], done);
    });
});