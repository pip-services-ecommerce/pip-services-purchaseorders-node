let PurchaseOrdersLambdaFunction = require('../obj/src/container/PurchaseOrdersLambdaFunction').PurchaseOrdersLambdaFunction;

module.exports = new PurchaseOrdersLambdaFunction().getHandler();