// import { ConfigParams } from 'pip-services3-commons-node';

// import { PurchaseOrdersMemoryPersistence } from '../../src/persistence/PurchaseOrdersMemoryPersistence';
// import { PurchaseOrdersPersistenceFixture } from './PurchaseOrdersPersistenceFixture';

// suite('PurchaseOrdersMemoryPersistence', ()=> {
//     let persistence: PurchaseOrdersMemoryPersistence;
//     let fixture: PurchaseOrdersPersistenceFixture;
    
//     setup((done) => {
//         persistence = new PurchaseOrdersMemoryPersistence();
//         persistence.configure(new ConfigParams());
        
//         fixture = new PurchaseOrdersPersistenceFixture(persistence);
        
//         persistence.open(null, done);
//     });
    
//     teardown((done) => {
//         persistence.close(null, done);
//     });
        
//     test('CRUD Operations', (done) => {
//         fixture.testCrudOperations(done);
//     });

//     test('Get with Filters', (done) => {
//         fixture.testGetWithFilter(done);
//     });

// });