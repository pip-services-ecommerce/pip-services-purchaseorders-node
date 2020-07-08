"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_components_node_1 = require("pip-services3-components-node");
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const PurchaseOrdersMongoDbPersistence_1 = require("../persistence/PurchaseOrdersMongoDbPersistence");
const PurchaseOrdersFilePersistence_1 = require("../persistence/PurchaseOrdersFilePersistence");
const PurchaseOrdersMemoryPersistence_1 = require("../persistence/PurchaseOrdersMemoryPersistence");
const PurchaseOrdersController_1 = require("../logic/PurchaseOrdersController");
const PurchaseOrdersHttpServiceV1_1 = require("../services/version1/PurchaseOrdersHttpServiceV1");
class PurchaseOrdersServiceFactory extends pip_services3_components_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(PurchaseOrdersServiceFactory.MemoryPersistenceDescriptor, PurchaseOrdersMemoryPersistence_1.PurchaseOrdersMemoryPersistence);
        this.registerAsType(PurchaseOrdersServiceFactory.FilePersistenceDescriptor, PurchaseOrdersFilePersistence_1.PurchaseOrdersFilePersistence);
        this.registerAsType(PurchaseOrdersServiceFactory.MongoDbPersistenceDescriptor, PurchaseOrdersMongoDbPersistence_1.PurchaseOrdersMongoDbPersistence);
        this.registerAsType(PurchaseOrdersServiceFactory.ControllerDescriptor, PurchaseOrdersController_1.PurchaseOrdersController);
        this.registerAsType(PurchaseOrdersServiceFactory.HttpServiceDescriptor, PurchaseOrdersHttpServiceV1_1.PurchaseOrdersHttpServiceV1);
    }
}
exports.PurchaseOrdersServiceFactory = PurchaseOrdersServiceFactory;
PurchaseOrdersServiceFactory.Descriptor = new pip_services3_commons_node_1.Descriptor("pip-services-purchaseorders", "factory", "default", "default", "1.0");
PurchaseOrdersServiceFactory.MemoryPersistenceDescriptor = new pip_services3_commons_node_1.Descriptor("pip-services-purchaseorders", "persistence", "memory", "*", "1.0");
PurchaseOrdersServiceFactory.FilePersistenceDescriptor = new pip_services3_commons_node_1.Descriptor("pip-services-purchaseorders", "persistence", "file", "*", "1.0");
PurchaseOrdersServiceFactory.MongoDbPersistenceDescriptor = new pip_services3_commons_node_1.Descriptor("pip-services-purchaseorders", "persistence", "mongodb", "*", "1.0");
PurchaseOrdersServiceFactory.ControllerDescriptor = new pip_services3_commons_node_1.Descriptor("pip-services-purchaseorders", "controller", "default", "*", "1.0");
PurchaseOrdersServiceFactory.HttpServiceDescriptor = new pip_services3_commons_node_1.Descriptor("pip-services-purchaseorders", "service", "http", "*", "1.0");
//# sourceMappingURL=PurchaseOrdersServiceFactory.js.map