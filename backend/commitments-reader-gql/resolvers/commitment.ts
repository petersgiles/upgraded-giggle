export const DB_TABLE_COMMITMENT = 'commitment'

export class Commitment {
	connectorKeys: { db: string }

	constructor(connectorKeys: { db: string }) {
		this.connectorKeys = connectorKeys
	}

	knex = (context: any) => context.connectors[this.connectorKeys.db].connection

	async getById(id: any, context: any): Promise<any> {
		let result = await this.knex(context)
			.select()
			.from(DB_TABLE_COMMITMENT)
			.where('id', id)

		return result && result[0]
	}

	async getAll(context: any): Promise<any[]> {
		let result = await this.knex(context)
			.select()
			.from(DB_TABLE_COMMITMENT)
		return result
	}

	async upsert(payload: any, context: any): Promise<void> {
		if (payload.item.id) {
			return await this.knex(context)(DB_TABLE_COMMITMENT)
				.where({ id: payload.item.id })
				.update({ ...payload.item })
		} else {
			return await this.knex(context)(DB_TABLE_COMMITMENT).insert({
				...payload.item,
			})
		}
	}

	async delete(id: any, context: any): Promise<void> {
		return await this.knex(context)(DB_TABLE_COMMITMENT)
			.where({ id: id })
			.del()
	}
}

export const dropCommitmentTable = (knex: any) => {
	knex.schema.hasTable(DB_TABLE_COMMITMENT).then(function(exists: any) {
		if (!exists) {
			return knex.schema.dropTable(DB_TABLE_COMMITMENT)
		}
	})
}

export const createCommitmentTable = (knex: any) => {
	knex.schema.hasTable(DB_TABLE_COMMITMENT).then(function(exists: any) {
		if (!exists) {
			return knex.schema.createTable(DB_TABLE_COMMITMENT, function(t: any) {
				t.increments('id').primary()
				t.string('title', 512)
			})
		}
	})
}
