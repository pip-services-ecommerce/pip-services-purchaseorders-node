# <img src="https://github.com/pip-services/pip-services/raw/master/design/Logo.png" alt="Pip.Services Logo" style="max-width:30%"> <br/> Purchase orders microservice

This is purchase orders microservice from Pip.Services library. 
It stores customer purchase orders internally or in external PCI-complient service like Paypal

The microservice currently supports the following deployment options:
* Deployment platforms: Standalone Process, Seneca
* External APIs: HTTP/REST, Seneca
* Persistence: Flat Files, MongoDB

This microservice has no dependencies on other microservices.

<a name="links"></a> Quick Links:

* [Download Links](doc/Downloads.md)
* [Development Guide](doc/Development.md)
* [Configuration Guide](doc/Configuration.md)
* [Deployment Guide](doc/Deployment.md)
* Client SDKs
  - [Node.js SDK](https://github.com/pip-services-ecommerce/pip-clients-purchaseorders-node)
* Communication Protocols
  - [HTTP Version 1](doc/HttpProtocolV1.md)
  - [Seneca Version 1](doc/SenecaProtocolV1.md)
  - [Lambda Version 1](doc/LambdaProtocolV1.md)

## Contract

Logical contract of the microservice is presented below. For physical implementation (HTTP/REST, Thrift, Seneca, Lambda, etc.),
please, refer to documentation of the specific protocol.

```typescript
export class ShippingDetailsV1 {
    public recipient: string;
    public phone?: string;
    public line1: string;
    public line2?: string;
    public city: string;
    public state?: string;
    public postal_code?: string;
    public country_code: string; // ISO 3166-1
    public instructions?: string;
}

export class PurchaseItemV1 {
    public product_id: string;
    public product_name: string;
    public description?: string;
    public quantity: number;
    public price: number;
    public discount?: number;
    public discount_price?: number;
    public total: number;
}

class PurchaseOrderV1 implements IStringIdentifiable {
    public id: string;
    public number?: string;
    public customer_id: string;
    public state?: string;
    public state_details?: string;
    public currency_code: string;

    public create_time?: Date;
    public update_time?: Date;
    public paid_time?: Date;
    public refunded_time?: Date;
    
    public payment_method_id?: string;
    public payment_id?: string;
    
    public shipping_details?: ShippingDetailsV1;
    public items?: PurchaseItemV1[];

    public subtotal?: number;
    public discount?: number;
    public discount_code?: string;
    public shipping_cost?: number;
    public tax_percent?: number;
    public tax?: number;
    public other_cost?: number;
    public total: number;
}

export class PurchaseOrderStateV1 {
    public static New: string = "new";
    public static Canceled: string = "canceled";
    public static Paid: string = "paid";
    public static Failed: string = "failed";
    public static Refunded: string = "refunded";
}

interface IPurchaseOrdersV1 {
    getOrders(correlationId: string, filter: FilterParams, paging: PagingParams, 
        callback: (err: any, page: DataPage<PurchaseOrderV1>) => void): void;

    getOrderById(correlationId: string, order_id: string, 
        callback: (err: any, order: PurchaseOrderV1) => void): void;

    createOrder(correlationId: string, order: PurchaseOrderV1, 
        callback: (err: any, order: PurchaseOrderV1) => void): void;

    updateOrder(correlationId: string, order: PurchaseOrderV1, 
        callback: (err: any, order: PurchaseOrderV1) => void): void;

    deleteOrderById(correlationId: string, order_id: string,
        callback: (err: any, order: PurchaseOrderV1) => void): void;
}
```

## Download

Right now the only way to get the microservice is to check it out directly from github repository
```bash
git clone git@github.com:pip-services-ecommerce/pip-services-purchaseorders-node.git
```

Pip.Service team is working to implement packaging and make stable releases available for your 
as zip downloadable archieves.

## Run

Add **config.yml** file to the root of the microservice folder and set configuration parameters.
As the starting point you can use example configuration from **config.example.yml** file. 

Example of microservice configuration
```yaml
- descriptor: "pip-services-container:container-info:default:default:1.0"
  name: "pip-services-purchaseorders"
  description: "PurchaseOrders microservice"

- descriptor: "pip-services-commons:logger:console:default:1.0"
  level: "trace"

- descriptor: "pip-services-purchaseorders:persistence:file:default:1.0"
  path: "./data/purchase_orders.json"

- descriptor: "pip-services-purchaseorders:controller:default:default:1.0"

- descriptor: "pip-services-purchaseorders:service:http:default:1.0"
  connection:
    protocol: "http"
    host: "0.0.0.0"
    port: 8080
```
 
For more information on the microservice configuration see [Configuration Guide](Configuration.md).

Start the microservice using the command:
```bash
node run
```

## Use

The easiest way to work with the microservice is to use client SDK. 
The complete list of available client SDKs for different languages is listed in the [Quick Links](#links)

If you use Node.js then you should add dependency to the client SDK into **package.json** file of your project
```javascript
{
    ...
    "dependencies": {
        ....
        "pip-clients-purchaseorders-node": "^1.1.*",
        ...
    }
}
```

Inside your code get the reference to the client SDK
```javascript
var sdk = new require('pip-clients-purchaseorders-node');
```

Define client configuration parameters that match configuration of the microservice external API
```javascript
// Client configuration
var config = {
    connection: {
        protocol: 'http',
        host: 'localhost', 
        port: 8080
    }
};
```

Instantiate the client and open connection to the microservice
```javascript
// Create the client instance
var client = sdk.PurchaseOrdersHttpClientV1(config);

// Connect to the microservice
client.open(null, function(err) {
    if (err) {
        console.error('Connection to the microservice failed');
        console.error(err);
        return;
    }
    
    // Work with the microservice
    ...
});
```

Now the client is ready to perform operations
```javascript
// Create a new purchase_order
var purchase_order = {
    id: '1',
    customer_id: '1',
    currency_code: 'USD',
    total: 100,
    state: PurchaseOrderStateV1.New,
    items: [{
        price: 40,
        product_id: 'product-1',
        product_name: 'product name 1',
        quantity: 2,
        total: 80,
        description: 'desctiption for product 1',
    },
    {
        price: 20,
        product_id: 'product-2',
        product_name: 'product name 2',
        quantity: 1,
        total: 20,
        description: 'desctiption for product 2',
    }]
};

client.createOrder(
    null,
    purchase_order,
    function (err, purchase_order) {
        ...
    }
);
```

```javascript
// Get the list of purchase_orders
client.getOrders(
    null,
    {
        customer_id: '1',
        state: 'new'
    },
    {
        total: true,
        skip: 0,
        take: 10
    },
    function(err, page) {
    ...    
    }
);
```    

## Acknowledgements

This microservice was created and currently maintained by *Sergey Seroukhov*.
