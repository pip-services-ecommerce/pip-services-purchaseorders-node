let assert = require('chai').assert;

import { PurchaseOrderV1 } from "../../src/data/version1/PurchaseOrderV1";
import { PurchaseOrderStateV1 } from "../../src";

export class TestModel {
    static createPurchaseOrder1(): PurchaseOrderV1 {
        return {
            id: '1',
            customer_id: '1',
            currency_code: 'USD',
            total: 100,
            state: PurchaseOrderStateV1.New,
            create_time: new Date(2005, 4, 14),
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
    }

    static createPurchaseOrder2(): PurchaseOrderV1 {
        return {
            id: '2',
            customer_id: '1',
            currency_code: 'USD',
            total: 100,
            state: PurchaseOrderStateV1.New,
            create_time: new Date(1983, 1, 10),
            items: [{
                price: 10,
                product_id: 'product-1',
                product_name: 'product name 1',
                quantity: 10,
                total: 100,
                description: 'desctiption for product 1',
            }]
        };
    }

    static createPurchaseOrder3(): PurchaseOrderV1 {
        return {
            id: '3',
            customer_id: '2',
            currency_code: 'USD',
            total: 50,
            state: PurchaseOrderStateV1.Paid,
            create_time: new Date(2013, 2, 11),
            items: []
        };
    }

    static assertEqualPurchaseOrder(actual: PurchaseOrderV1, expected: PurchaseOrderV1) {
        assert.isNotNull(actual);
        assert.isNotNull(expected);

        assert.equal(actual.id, expected.id);
        assert.equal(actual.customer_id, expected.customer_id);
        assert.equal(actual.total, expected.total);
        assert.equal(actual.currency_code, expected.currency_code);

        if (expected.items != null) {
            assert.isNotNull(actual.items);
            assert.equal(actual.items.length, expected.items.length);

            for (let index = 0; index < expected.items.length; index++) {
                const expectedItem = expected.items[index];

                let actualItem = actual.items.find((value) => value.product_id == expectedItem.product_id);
                assert.isNotNull(actualItem);
            }
        }
    }
}