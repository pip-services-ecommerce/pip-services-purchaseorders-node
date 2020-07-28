import { IStringIdentifiable } from 'pip-services3-commons-node';
import { PurchaseItemV1 } from './PurchaseItemV1';
import { ShippingDetailsV1 } from './ShippingDetailsV1';
export declare class PurchaseOrderV1 implements IStringIdentifiable {
    id: string;
    number?: string;
    customer_id: string;
    state?: string;
    state_details?: string;
    currency_code: string;
    retries?: number;
    create_time?: Date;
    update_time?: Date;
    paid_time?: Date;
    refunded_time?: Date;
    payment_method_id?: string;
    payment_id?: string;
    shipping_details?: ShippingDetailsV1;
    items?: PurchaseItemV1[];
    subtotal?: number;
    discount?: number;
    discount_code?: string;
    shipping_cost?: number;
    tax_percent?: number;
    tax?: number;
    other_cost?: number;
    total: number;
}
