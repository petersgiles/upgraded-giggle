import { TABLE } from './db'
import { logger } from '../../shared/logger';

export class PolicyBrief {
	connectorKeys: { db: string }

	constructor(connectorKeys: { db: string }) {
		this.connectorKeys = connectorKeys
	}

	knex = (context: any) => context.connectors[this.connectorKeys.db].connection

	async getById(id: any, context: any): Promise<any> {
		let result = await this.knex(context)
			.select()
			.from(TABLE.POLICY_BRIEF)
			.where('id', id)

		return result && result[0]
	}

	async getAll(args: any, context: any): Promise<any[]> {

        let result = await this.knex(context)
			.select()
            .from(TABLE.POLICY_BRIEF)
            
		return result
	}



	async upsert(payload: any, context: any): Promise<void> {
		if (payload.item.id) {
			return await this.knex(context)(TABLE.POLICY_BRIEF)
				.where({ id: payload.item.id })
				.update({ ...payload.item })
		} else {
			return await this.knex(context)(TABLE.POLICY_BRIEF).insert({
				...payload.item,
			})
		}
	}

	async delete(id: any, context: any): Promise<void> {
		return await this.knex(context)(TABLE.POLICY_BRIEF)
			.where({ id: id })
			.del()
	}
}
