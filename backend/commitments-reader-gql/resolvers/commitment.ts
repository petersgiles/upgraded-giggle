import { TABLE, getRefinedCommitments } from './db'

export class Commitment {
	connectorKeys: { db: string }

	constructor(connectorKeys: { db: string }) {
		this.connectorKeys = connectorKeys
	}

	knex = (context: any) => context.connectors[this.connectorKeys.db].connection

	async getById(id: any, context: any): Promise<any> {
		let result = await this.knex(context)
			.select()
			.from(TABLE.COMMITMENT)
			.where('id', id)

		return result && result[0]
	}

	async getAll(args: any, context: any): Promise<any[]> {
		return await getRefinedCommitments(this.knex(context), args)
	}

	async upsert(payload: any, context: any): Promise<void> {
		if (payload.item.id) {
			return await this.knex(context)(TABLE.COMMITMENT)
				.where({ id: payload.item.id })
				.update({ ...payload.item })
		} else {
			return await this.knex(context)(TABLE.COMMITMENT).insert({
				...payload.item,
			})
		}
	}

	async delete(id: any, context: any): Promise<void> {
		return await this.knex(context)(TABLE.COMMITMENT)
			.where({ id: id })
			.del()
	}
}
