import { CommandSet } from 'pip-services3-commons-node';
import { ICommand } from 'pip-services3-commons-node';
import { Command } from 'pip-services3-commons-node';
import { Schema } from 'pip-services3-commons-node';
import { Parameters } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { ObjectSchema } from 'pip-services3-commons-node';
import { TypeCode } from 'pip-services3-commons-node';
import { FilterParamsSchema } from 'pip-services3-commons-node';
import { PagingParamsSchema } from 'pip-services3-commons-node';

import { PurchaseOrderV1 } from '../data/version1/PurchaseOrderV1';
import { PurchaseOrderV1Schema } from '../data/version1/PurchaseOrderV1Schema';
import { IPurchaseOrdersController } from './IPurchaseOrdersController';

export class PurchaseOrdersCommandSet extends CommandSet {
    private _logic: IPurchaseOrdersController;

    constructor(logic: IPurchaseOrdersController) {
        super();

        this._logic = logic;

        // Register commands to the database
		this.addCommand(this.makeGetPurchaseOrdersCommand());
		this.addCommand(this.makeGetPurchaseOrderByIdCommand());
		this.addCommand(this.makeCreatePurchaseOrderCommand());
		this.addCommand(this.makeUpdatePurchaseOrderCommand());
		this.addCommand(this.makeDeletePurchaseOrderByIdCommand());
    }

	private makeGetPurchaseOrdersCommand(): ICommand {
		return new Command(
			"get_orders",
			new ObjectSchema(true)
				.withOptionalProperty('filter', new FilterParamsSchema())
				.withOptionalProperty('paging', new PagingParamsSchema()),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let filter = FilterParams.fromValue(args.get("filter"));
                let paging = PagingParams.fromValue(args.get("paging"));
                this._logic.getOrders(correlationId, filter, paging, callback);
            }
		);
	}

	private makeGetPurchaseOrderByIdCommand(): ICommand {
		return new Command(
			"get_order_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('order_id', TypeCode.String)
				.withRequiredProperty('customer_id', TypeCode.String),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let orderId = args.getAsString("order_id");
                let customerId = args.getAsString("customer_id");
                this._logic.getOrderById(correlationId, orderId, customerId, callback);
            }
		);
	}

	private makeCreatePurchaseOrderCommand(): ICommand {
		return new Command(
			"create_order",
			new ObjectSchema(true)
				.withRequiredProperty('order', new PurchaseOrderV1Schema()),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let order = args.get("order");
                this._logic.createOrder(correlationId, order, callback);
            }
		);
	}

	private makeUpdatePurchaseOrderCommand(): ICommand {
		return new Command(
			"update_order",
			new ObjectSchema(true)
				.withRequiredProperty('order', new PurchaseOrderV1Schema()),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let order = args.get("order");
                this._logic.updateOrder(correlationId, order, callback);
            }
		);
	}
	
	private makeDeletePurchaseOrderByIdCommand(): ICommand {
		return new Command(
			"delete_order_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('order_id', TypeCode.String)
				.withRequiredProperty('customer_id', TypeCode.String),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let orderId = args.getAsNullableString("order_id");
                let customerId = args.getAsString("customer_id");
                this._logic.deleteOrderById(correlationId, orderId, customerId, callback);
			}
		);
	}

}