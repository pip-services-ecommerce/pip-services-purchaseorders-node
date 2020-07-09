# HTTP Protocol (version 1) <br/> PurchaseOrders Microservice

PurchaseOrders microservice implements a HTTP compatible API, that can be accessed on configured port.
All input and output data is serialized in JSON format. Errors are returned in [standard format]().

* [POST /v1/purchase_orders/get_orders](#operation1)
* [POST /v1/purchase_orders/get_order_by_id](#operation2)
* [POST /v1/purchase_orders/create_order](#operation3)
* [POST /v1/purchase_orders/update_order](#operation4)
* [POST /v1/purchase_orders/delete_order_by_id](#operation5)

## Operations

### <a name="operation1"></a> Method: 'POST', route '/v1/purchase_orders/get_orders'

Get purchase orders by filter

**Request body:**
- filter: Object
    - id: string - (optional) unique order id
    - ids: string - (optional) list of unique order ids
    - customer_id: string - (optional) order reference customer id
    - state: string - (optional) order state (PurchaseOrderStateV1)
- paging: Object
  - skip: int - (optional) start of page (default: 0). Operation returns paged result
  - take: int - (optional) page length (max: 100). Operation returns paged result

**Response body:**
Page with retrieved orders

### <a name="operation2"></a> Method: 'POST', route '/v1/purchase_orders/get_order_by_id'

Get order by id

**Request body:**
- order_id: string - order id
- customer_id: string - order reference customer id

**Response body:**
- order: PurchaseOrderV1 - finded order 

### <a name="operation3"></a> Method: 'POST', route '/v1/purchase_orders/create_order'

Add new order

**Request body:** 
- order: PurchaseOrderV1 - params for creates new order

**Response body:**
- order: PurchaseOrderV1 - generated new order

### <a name="operation4"></a> Method: 'POST', route '/v1/purchase_orders/update_order'

Update existed order

**Request body:**
- order: PurchaseOrderV1 - params for update existed order

**Response body:**
- order: PurchaseOrderV1 - updated order 

### <a name="operation5"></a> Method: 'POST', route '/v1/purchase_orders/delete_order_by_id'

Delete order by id

**Request body:**
- order_id: string - order id for delete
- customer_id: string - customer id in the order to be deleted

**Response body:**
- order: PurchaseOrderV1 - deleted order 

