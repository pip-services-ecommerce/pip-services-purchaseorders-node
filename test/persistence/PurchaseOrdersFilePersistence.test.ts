import { ConfigParams } from 'pip-services3-commons-node';

import { PurchaseOrdersFilePersistence } from '../../src/persistence/PurchaseOrdersFilePersistence';
import { PurchaseOrdersPersistenceFixture } from './PurchaseOrdersPersistenceFixture';

suite('PurchaseOrdersFilePersistence', ()=> {
    let persistence: PurchaseOrdersFilePersistence;
    let fixture: PurchaseOrdersPersistenceFixture;
    
    setup((done) => {
        persistence = new PurchaseOrdersFilePersistence('./data/purchase_orders.test.json');

        fixture = new PurchaseOrdersPersistenceFixture(persistence);

        persistence.open(null, (err) => {
            persistence.clear(null, done);
        });
    });
    
    teardown((done) => {
        persistence.close(null, done);
    });
        
    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });

    test('Get with Filters', (done) => {
        fixture.testGetWithFilter(done);
    });

});