let _ = require('lodash');
let async = require('async');
let restify = require('restify');
let assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';

import { PurchaseOrderV1 } from '../../../src/data/version1/PurchaseOrderV1';
import { PurchaseOrderStateV1 } from '../../../src/data/version1/PurchaseOrderStateV1';
import { PurchaseOrdersMemoryPersistence } from '../../../src/persistence/PurchaseOrdersMemoryPersistence';
import { PurchaseOrdersController } from '../../../src/logic/PurchaseOrdersController';
import { PurchaseOrdersHttpServiceV1 } from '../../../src/services/version1/PurchaseOrdersHttpServiceV1';
import { TestModel } from '../../data/TestModel';

let httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

let ORDER1: PurchaseOrderV1 = TestModel.createPurchaseOrder1();
let ORDER2: PurchaseOrderV1 = TestModel.createPurchaseOrder2();


suite('PurchaseOrdersHttpServiceV1', () => {
    let service: PurchaseOrdersHttpServiceV1;
    let rest: any;

    suiteSetup((done) => {
        let persistence = new PurchaseOrdersMemoryPersistence();
        let controller = new PurchaseOrdersController();

        service = new PurchaseOrdersHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('pip-services-purchaseorders', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-purchaseorders', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-purchaseorders', 'service', 'http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        service.open(null, done);
    });

    suiteTeardown((done) => {
        service.close(null, done);
    });

    setup(() => {
        let url = 'http://localhost:3000';
        rest = restify.createJsonClient({ url: url, version: '*' });
    });


    test('CRUD Operations', (done) => {
        let purchaseOrder1, purchaseOrder2: PurchaseOrderV1;

        async.series([
            // Create one purchase order
            (callback) => {
                rest.post('/v1/purchase_orders/create_order',
                    {
                        order: ORDER1
                    },
                    (err, req, res, purchaseOrder) => {
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
                rest.post('/v1/purchase_orders/create_order',
                    {
                        order: ORDER2
                    },
                    (err, req, res, purchaseOrder) => {
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
                rest.post('/v1/purchase_orders/get_orders',
                    {},
                    (err, req, res, page) => {
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

                rest.post('/v1/purchase_orders/update_order',
                    {
                        order: purchaseOrder1
                    },
                    (err, req, res, purchaseOrder) => {
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
                rest.post('/v1/purchase_orders/delete_order_by_id',
                    {
                        order_id: purchaseOrder1.id,
                        customer_id: purchaseOrder1.customer_id
                    },
                    (err, req, res, result) => {
                        assert.isNull(err);

                        //assert.isNull(result);

                        callback();
                    }
                );
            },
            // Try to get delete purchase order
            (callback) => {
                rest.post('/v1/purchase_orders/get_order_by_id',
                    {
                        order_id: purchaseOrder1.id,
                        customer_id: purchaseOrder1.customer_id
                    },
                    (err, req, res, result) => {
                        assert.isNull(err);

                        //assert.isNull(result);

                        callback();
                    }
                );
            }
        ], done);
    });
});