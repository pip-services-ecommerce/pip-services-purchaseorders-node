import { IStringIdentifiable } from 'pip-services3-commons-node';
import { PurchaseItemV1 } from './PurchaseItemV1';
import { ShippingDetailsV1 } from './ShippingDetailsV1';

export class PurchaseOrderV1 implements IStringIdentifiable {
    public id: string;
    public number?: string;
    public customer_id: string;
    public state?: string;
    public state_details?: string;

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