import { DB_TABLE_TAG } from ".";


export class Tag {
	connectorKeys: { db: string }

	constructor(connectorKeys: { db: string }) {
		this.connectorKeys = connectorKeys
	}

	knex = (context: any) => context.connectors[this.connectorKeys.db].connection

	async getById(id: any, context: any): Promise<any> {
		let result = await this.knex(context)
			.select()
			.from(DB_TABLE_TAG)
			.where('id', id)

		return result && result[0]
	}

	async getAll(context: any): Promise<any[]> {
		let result = await this.knex(context)
			.select()
			.from(DB_TABLE_TAG)
		return result
	}

	async getByParent(payload: any, context: any): Promise<any[]> {
		let result = await this.knex(context)
			.select()
			.from(DB_TABLE_TAG)
			.where('parent', payload.parent)
		return result
	}

	async upsert(payload: any, context: any): Promise<void> {
		if (payload.item.id) {
			return await this.knex(context)(DB_TABLE_TAG)
				.where({ id: payload.item.id })
				.update({ ...payload.item })
		} else {
			return await this.knex(context)(DB_TABLE_TAG).insert({
				...payload.item,
			})
		}
	}

	async delete(id: any, context: any): Promise<void> {
		return await this.knex(context)(DB_TABLE_TAG)
			.where({ id: id })
			.del()
	}
}
