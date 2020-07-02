let PurchaseOrdersProcess = require('../obj/src/container/PurchaseOrdersProcess').PurchaseOrdersProcess;

try {
    new PurchaseOrdersProcess().run(process.argv);
} catch (ex) {
    console.error(ex);
}
