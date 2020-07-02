// let _ = require('lodash');
// let async = require('async');
// let assert = require('chai').assert;

// import { Descriptor } from 'pip-services3-commons-node';
// import { ConfigParams } from 'pip-services3-commons-node';
// import { References } from 'pip-services3-commons-node';
// import { ConsoleLogger } from 'pip-services3-components-node';

// import { PurchaseOrderV1 } from '../../src/data/version1/PurchaseOrderV1';
// import { PurchaseOrderTypeV1 } from '../../src/data/version1/PurchaseOrderTypeV1';
// import { PurchaseOrderStateV1 } from '../../src/data/version1/PurchaseOrderStateV1';
// import { PurchaseOrdersMemoryPersistence } from '../../src/persistence/PurchaseOrdersMemoryPersistence';
// import { PurchaseOrdersController } from '../../src/logic/PurchaseOrdersController';
// import { PurchaseOrdersLambdaFunction } from '../../src/container/PurchaseOrdersLambdaFunction';

// let ORDER1: PurchaseOrderV1 = {
//     id: '1',
//     customer_id: '1',
//     type: PurchaseOrderTypeV1.Visa,
//     number: '1111111111111111',
//     expire_month: 1,
//     expire_year: 2021,
//     first_name: 'Bill',
//     last_name: 'Gates',
//     billing_address: {
//         line1: '2345 Swan Rd',
//         city: 'Tucson',
//         postal_code: '85710',
//         country_code: 'US'
//     },
//     ccv: '213',
//     name: 'Test Order 1',
//     saved: true,
//     default: true,
//     state: PurchaseOrderStateV1.Ok
// };
// let ORDER2: PurchaseOrderV1 = {
//     id: '2',
//     customer_id: '1',
//     type: PurchaseOrderTypeV1.Visa,
//     number: '2222222222222222',
//     expire_month: 4,
//     expire_year: 2028,
//     first_name: 'Joe',
//     last_name: 'Dow',
//     billing_address: {
//         line1: '123 Broadway Blvd',
//         city: 'New York',
//         postal_code: '123001',
//         country_code: 'US'
//     },
//     name: 'Test Order 2',
//     saved: true,
//     default: false,
//     state: PurchaseOrderStateV1.Expired
// };

// suite('PurchaseOrdersLambdaFunction', ()=> {
//     let lambda: PurchaseOrdersLambdaFunction;

//     suiteSetup((done) => {
//         let config = ConfigParams.fromTuples(
//             'logger.descriptor', 'pip-services:logger:console:default:1.0',
//             'persistence.descriptor', 'pip-services-purchaseorders:persistence:memory:default:1.0',
//             'controller.descriptor', 'pip-services-purchaseorders:controller:default:default:1.0'
//         );

//         lambda = new PurchaseOrdersLambdaFunction();
//         lambda.configure(config);
//         lambda.open(null, done);
//     });
    
//     suiteTeardown((done) => {
//         lambda.close(null, done);
//     });
    
//     test('CRUD Operations', (done) => {
//         var purchaseOrder1, purchaseOrder2: PurchaseOrderV1;

//         async.series([
//         // Create one purchase order
//             (callback) => {
//                 lambda.act(
//                     {
//                         role: 'purchase_orders',
//                         cmd: 'create_order',
//                         order: ORDER1
//                     },
//                     (err, purchaseOrder) => {
//                         assert.isNull(err);

//                         assert.isObject(purchaseOrder);
//                         assert.equal(purchaseOrder.number, ORDER1.number);
//                         assert.equal(purchaseOrder.expire_year, ORDER1.expire_year);
//                         assert.equal(purchaseOrder.customer_id, ORDER1.customer_id);

//                         purchaseOrder1 = purchaseOrder;

//                         callback();
//                     }
//                 );
//             },
//         // Create another purchase order
//             (callback) => {
//                 lambda.act(
//                     {
//                         role: 'purchase_orders',
//                         cmd: 'create_order',
//                         order: ORDER2
//                     },
//                     (err, purchaseOrder) => {
//                         assert.isNull(err);

//                         assert.isObject(purchaseOrder);
//                         assert.equal(purchaseOrder.number, ORDER2.number);
//                         assert.equal(purchaseOrder.expire_year, ORDER2.expire_year);
//                         assert.equal(purchaseOrder.customer_id, ORDER2.customer_id);

//                         purchaseOrder2 = purchaseOrder;

//                         callback();
//                     }
//                 );
//             },
//         // Get all purchase orders
//             (callback) => {
//                 lambda.act(
//                     {
//                         role: 'purchase_orders',
//                         cmd: 'get_orders' 
//                     },
//                     (err, page) => {
//                         assert.isNull(err);

//                         assert.isObject(page);
//                         assert.lengthOf(page.data, 2);

//                         callback();
//                     }
//                 );
//             },
//         // Update the purchase order
//             (callback) => {
//                 purchaseOrder1.name = 'Updated Order 1';

//                 lambda.act(
//                     {
//                         role: 'purchase_orders',
//                         cmd: 'update_order',
//                         order: purchaseOrder1
//                     },
//                     (err, purchaseOrder) => {
//                         assert.isNull(err);

//                         assert.isObject(purchaseOrder);
//                         assert.equal(purchaseOrder.name, 'Updated Order 1');
//                         assert.equal(purchaseOrder.id, ORDER1.id);

//                         purchaseOrder1 = purchaseOrder;

//                         callback();
//                     }
//                 );
//             },
//         // Delete purchase order
//             (callback) => {
//                 lambda.act(
//                     {
//                         role: 'purchase_orders',
//                         cmd: 'delete_order_by_id',
//                         order_id: purchaseOrder1.id,
//                         customer_id: purchaseOrder1.customer_id
//                     },
//                     (err) => {
//                         assert.isNull(err);

//                         callback();
//                     }
//                 );
//             },
//         // Try to get delete purchase order
//             (callback) => {
//                 lambda.act(
//                     {
//                         role: 'purchase_orders',
//                         cmd: 'get_order_by_id',
//                         order_id: purchaseOrder1.id,
//                         customer_id: purchaseOrder1.customer_id
//                     },
//                     (err, purchaseOrder) => {
//                         assert.isNull(err);

//                         assert.isNull(purchaseOrder || null);

//                         callback();
//                     }
//                 );
//             }
//         ], done);
//     });
// });