// let _ = require('lodash');
// let async = require('async');
// let restify = require('restify');
// let assert = require('chai').assert;

// import { ConfigParams } from 'pip-services3-commons-node';
// import { Descriptor } from 'pip-services3-commons-node';
// import { References } from 'pip-services3-commons-node';

// import { PurchaseOrderV1 } from '../../../src/data/version1/PurchaseOrderV1';
// import { PurchaseOrderTypeV1 } from '../../../src/data/version1/PurchaseOrderTypeV1';
// import { PurchaseOrderStateV1 } from '../../../src/data/version1/PurchaseOrderStateV1';
// import { PurchaseOrdersMemoryPersistence } from '../../../src/persistence/PurchaseOrdersMemoryPersistence';
// import { PurchaseOrdersController } from '../../../src/logic/PurchaseOrdersController';
// import { PurchaseOrdersHttpServiceV1 } from '../../../src/services/version1/PurchaseOrdersHttpServiceV1';

// let httpConfig = ConfigParams.fromTuples(
//     "connection.protocol", "http",
//     "connection.host", "localhost",
//     "connection.port", 3000
// );

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


// suite('PurchaseOrdersHttpServiceV1', ()=> {    
//     let service: PurchaseOrdersHttpServiceV1;
//     let rest: any;

//     suiteSetup((done) => {
//         let persistence = new PurchaseOrdersMemoryPersistence();
//         let controller = new PurchaseOrdersController();

//         service = new PurchaseOrdersHttpServiceV1();
//         service.configure(httpConfig);

//         let references: References = References.fromTuples(
//             new Descriptor('pip-services-purchaseorders', 'persistence', 'memory', 'default', '1.0'), persistence,
//             new Descriptor('pip-services-purchaseorders', 'controller', 'default', 'default', '1.0'), controller,
//             new Descriptor('pip-services-purchaseorders', 'service', 'http', 'default', '1.0'), service
//         );
//         controller.setReferences(references);
//         service.setReferences(references);

//         service.open(null, done);
//     });
    
//     suiteTeardown((done) => {
//         service.close(null, done);
//     });

//     setup(() => {
//         let url = 'http://localhost:3000';
//         rest = restify.createJsonClient({ url: url, version: '*' });
//     });
    
    
//     test('CRUD Operations', (done) => {
//         let purchaseOrder1, purchaseOrder2: PurchaseOrderV1;

//         async.series([
//         // Create one purchase order
//             (callback) => {
//                 rest.post('/v1/purchase_orders/create_order',
//                     {
//                         order: ORDER1
//                     },
//                     (err, req, res, purchaseOrder) => {
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
//                 rest.post('/v1/purchase_orders/create_order', 
//                     {
//                         order: ORDER2
//                     },
//                     (err, req, res, purchaseOrder) => {
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
//                 rest.post('/v1/purchase_orders/get_orders',
//                     {},
//                     (err, req, res, page) => {
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

//                 rest.post('/v1/purchase_orders/update_order',
//                     { 
//                         order: purchaseOrder1
//                     },
//                     (err, req, res, purchaseOrder) => {
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
//                 rest.post('/v1/purchase_orders/delete_order_by_id',
//                     {
//                         order_id: purchaseOrder1.id,
//                         customer_id: purchaseOrder1.customer_id
//                     },
//                     (err, req, res, result) => {
//                         assert.isNull(err);

//                         //assert.isNull(result);

//                         callback();
//                     }
//                 );
//             },
//         // Try to get delete purchase order
//             (callback) => {
//                 rest.post('/v1/purchase_orders/get_order_by_id',
//                     {
//                         order_id: purchaseOrder1.id,
//                         customer_id: purchaseOrder1.customer_id
//                     },
//                     (err, req, res, result) => {
//                         assert.isNull(err);

//                         //assert.isNull(result);

//                         callback();
//                     }
//                 );
//             }
//         ], done);
//     });
// });