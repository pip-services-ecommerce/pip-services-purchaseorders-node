// import { Factory } from 'pip-services3-components-node';
// import { Descriptor } from 'pip-services3-commons-node';

// import { PurchaseOrdersMongoDbPersistence } from '../persistence/PurchaseOrdersMongoDbPersistence';
// import { PurchaseOrdersFilePersistence } from '../persistence/PurchaseOrdersFilePersistence';
// import { PurchaseOrdersMemoryPersistence } from '../persistence/PurchaseOrdersMemoryPersistence';
// import { PurchaseOrdersController } from '../logic/PurchaseOrdersController';
// import { PurchaseOrdersHttpServiceV1 } from '../services/version1/PurchaseOrdersHttpServiceV1';

// export class PurchaseOrdersServiceFactory extends Factory {
// 	public static Descriptor = new Descriptor("pip-services-purchaseorders", "factory", "default", "default", "1.0");
// 	public static MemoryPersistenceDescriptor = new Descriptor("pip-services-purchaseorders", "persistence", "memory", "*", "1.0");
// 	public static FilePersistenceDescriptor = new Descriptor("pip-services-purchaseorders", "persistence", "file", "*", "1.0");
// 	public static MongoDbPersistenceDescriptor = new Descriptor("pip-services-purchaseorders", "persistence", "mongodb", "*", "1.0");
// 	public static ControllerDescriptor = new Descriptor("pip-services-purchaseorders", "controller", "default", "*", "1.0");
// 	public static HttpServiceDescriptor = new Descriptor("pip-services-purchaseorders", "service", "http", "*", "1.0");
	
// 	constructor() {
// 		super();
// 		this.registerAsType(PurchaseOrdersServiceFactory.MemoryPersistenceDescriptor, PurchaseOrdersMemoryPersistence);
// 		this.registerAsType(PurchaseOrdersServiceFactory.FilePersistenceDescriptor, PurchaseOrdersFilePersistence);
// 		this.registerAsType(PurchaseOrdersServiceFactory.MongoDbPersistenceDescriptor, PurchaseOrdersMongoDbPersistence);
// 		this.registerAsType(PurchaseOrdersServiceFactory.ControllerDescriptor, PurchaseOrdersController);
// 		this.registerAsType(PurchaseOrdersServiceFactory.HttpServiceDescriptor, PurchaseOrdersHttpServiceV1);
// 	}
	
// }
