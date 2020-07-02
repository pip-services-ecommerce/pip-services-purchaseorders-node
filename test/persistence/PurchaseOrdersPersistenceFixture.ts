// let _ = require('lodash');
// let async = require('async');
// let assert = require('chai').assert;

// import { FilterParams } from 'pip-services3-commons-node';
// import { PagingParams } from 'pip-services3-commons-node';

// import { PurchaseOrderV1 } from '../../src/data/version1/PurchaseOrderV1';
// import { PurchaseOrderTypeV1 } from '../../src/data/version1/PurchaseOrderTypeV1';
// import { PurchaseOrderStateV1 } from '../../src/data/version1/PurchaseOrderStateV1';

// import { IPurchaseOrdersPersistence } from '../../src/persistence/IPurchaseOrdersPersistence';
// import { AddressV1 } from '../../src/data/version1/ShippingDetailsV1';

// let ORDER1: PurchaseOrderV1 = {
//     id: '1',
//     customer_id: '1',
//     type: PurchaseOrderTypeV1.Visa,
//     number: '4032036094894795',
//     expire_month: 1,
//     expire_year: 2021,
//     first_name: 'Bill',
//     last_name: 'Gates',
//     billing_address: {
//         line1: '2345 Swan Rd',
//         city: 'Tucson',
//         state: 'AZ',
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
//     number: '4032037578262780',
//     expire_month: 4,
//     expire_year: 2028,
//     first_name: 'Joe',
//     last_name: 'Dow',
//     billing_address: {
//         line1: '123 Broadway Blvd',
//         city: 'New York',
//         state: 'NY',
//         postal_code: '123001',
//         country_code: 'US'
//     },
//     name: 'Test Order 2',
//     saved: true,
//     default: false,
//     state: PurchaseOrderStateV1.Expired
// };
// let ORDER3: PurchaseOrderV1 = {
//     id: '3',
//     customer_id: '2',
//     type: PurchaseOrderTypeV1.Visa,
//     number: '4032037578262780',
//     expire_month: 5,
//     expire_year: 2022,
//     first_name: 'Steve',
//     last_name: 'Jobs',
//     billing_address: {
//         line1: '234 6th Str',
//         city: 'Los Angeles',
//         state: 'CA',
//         postal_code: '65320',
//         country_code: 'US'
//     },
//     ccv: '124',
//     name: 'Test Order 2',
//     state: PurchaseOrderStateV1.Ok
// };

// export class PurchaseOrdersPersistenceFixture {
//     private _persistence: IPurchaseOrdersPersistence;
    
//     constructor(persistence) {
//         assert.isNotNull(persistence);
//         this._persistence = persistence;
//     }

//     private testCreatePurchaseOrders(done) {
//         async.series([
//         // Create one purchase order
//             (callback) => {
//                 this._persistence.create(
//                     null,
//                     ORDER1,
//                     (err, purchaseOrder) => {
//                         assert.isNull(err);

//                         assert.isObject(purchaseOrder);
//                         assert.equal(purchaseOrder.first_name, ORDER1.first_name);
//                         assert.equal(purchaseOrder.last_name, ORDER1.last_name);
//                         assert.equal(purchaseOrder.expire_year, ORDER1.expire_year);
//                         assert.equal(purchaseOrder.customer_id, ORDER1.customer_id);

//                         callback();
//                     }
//                 );
//             },
//         // Create another purchase order
//             (callback) => {
//                 this._persistence.create(
//                     null,
//                     ORDER2,
//                     (err, purchaseOrder) => {
//                         assert.isNull(err);

//                         assert.isObject(purchaseOrder);
//                         assert.equal(purchaseOrder.first_name, ORDER2.first_name);
//                         assert.equal(purchaseOrder.last_name, ORDER2.last_name);
//                         assert.equal(purchaseOrder.expire_year, ORDER2.expire_year);
//                         assert.equal(purchaseOrder.customer_id, ORDER2.customer_id);

//                         callback();
//                     }
//                 );
//             },
//         // Create yet another purchase order
//             (callback) => {
//                 this._persistence.create(
//                     null,
//                     ORDER3,
//                     (err, purchaseOrder) => {
//                         assert.isNull(err);

//                         assert.isObject(purchaseOrder);
//                         assert.equal(purchaseOrder.first_name, ORDER3.first_name);
//                         assert.equal(purchaseOrder.last_name, ORDER3.last_name);
//                         assert.equal(purchaseOrder.expire_year, ORDER3.expire_year);
//                         assert.equal(purchaseOrder.customer_id, ORDER3.customer_id);

//                         callback();
//                     }
//                 );
//             }
//         ], done);
//     }
                
//     testCrudOperations(done) {
//         let purchaseOrder1: PurchaseOrderV1;

//         async.series([
//         // Create items
//             (callback) => {
//                 this.testCreatePurchaseOrders(callback);
//             },
//         // Get all purchase orders
//             (callback) => {
//                 this._persistence.getPageByFilter(
//                     null,
//                     new FilterParams(),
//                     new PagingParams(),
//                     (err, page) => {
//                         assert.isNull(err);

//                         assert.isObject(page);
//                         assert.lengthOf(page.data, 3);

//                         purchaseOrder1 = page.data[0];

//                         callback();
//                     }
//                 );
//             },
//         // Update the purchase order
//             (callback) => {
//                 purchaseOrder1.name = 'Updated Order 1';

//                 this._persistence.update(
//                     null,
//                     purchaseOrder1,
//                     (err, purchaseOrder) => {
//                         assert.isNull(err);

//                         assert.isObject(purchaseOrder);
//                         assert.equal(purchaseOrder.name, 'Updated Order 1');
//                         // PayPal changes id on update
//                         //!!assert.equal(purchaseOrder.id, purchaseOrder1.id);

//                         purchaseOrder1 = purchaseOrder;

//                         callback();
//                     }
//                 );
//             },
//         // Delete purchase order
//             (callback) => {
//                 this._persistence.deleteById(
//                     null,
//                     purchaseOrder1.id,
//                     (err) => {
//                         assert.isNull(err);

//                         callback();
//                     }
//                 );
//             },
//         // Try to get delete purchase order
//             (callback) => {
//                 this._persistence.getOneById(
//                     null,
//                     purchaseOrder1.id,
//                     (err, purchaseOrder) => {
//                         assert.isNull(err);

//                         assert.isNull(purchaseOrder || null);

//                         callback();
//                     }
//                 );
//             }
//         ], done);
//     }

//     testGetWithFilter(done) {
//         async.series([
//         // Create purchase orders
//             (callback) => {
//                 this.testCreatePurchaseOrders(callback);
//             },
//         // Get purchase orders filtered by customer id
//             (callback) => {
//                 this._persistence.getPageByFilter(
//                     null,
//                     FilterParams.fromValue({
//                         customer_id: '1'
//                     }),
//                     new PagingParams(),
//                     (err, page) => {
//                         assert.isNull(err);

//                         assert.isObject(page);
//                         assert.lengthOf(page.data, 2);

//                         callback();
//                     }
//                 );
//             },
//         // Get purchase orders by state
//             (callback) => {
//                 this._persistence.getPageByFilter(
//                     null,
//                     FilterParams.fromValue({
//                         state: 'ok'
//                     }),
//                     new PagingParams(),
//                     (err, page) => {
//                         assert.isNull(err);

//                         assert.isObject(page);
//                         // PayPal calculate states by itself
//                         //assert.lengthOf(page.data, 2);

//                         callback();
//                     }
//                 );
//             },
//         // Get purchase orders by saved
//             (callback) => {
//                 this._persistence.getPageByFilter(
//                     null,
//                     FilterParams.fromValue({
//                         saved: true
//                     }),
//                     new PagingParams(),
//                     (err, page) => {
//                         assert.isNull(err);

//                         assert.isObject(page);
//                         assert.lengthOf(page.data, 2);

//                         callback();
//                     }
//                 );
//             },
//         // Get purchase orders by ids
//             (callback) => {
//                 this._persistence.getPageByFilter(
//                     null,
//                     FilterParams.fromValue({
//                         ids: ['1', '3']
//                     }),
//                     new PagingParams(),
//                     (err, page) => {
//                         assert.isNull(err);

//                         assert.isObject(page);
//                         // PayPal manages ids by itself
//                         //assert.lengthOf(page.data, 2);

//                         callback();
//                     }
//                 );
//             },
//         ], done);
//     }

// }
