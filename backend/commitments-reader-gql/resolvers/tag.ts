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

export const dropTagTable = (knex: any) => {
	knex.schema.hasTable(DB_TABLE_TAG).then(function(exists: any) {
		if (!exists) {
			return knex.schema.dropTable(DB_TABLE_TAG)
		}
	})
}

export const createTagTable = (knex: any) => {
	knex.schema.hasTable(DB_TABLE_TAG).then(function(exists: any) {
		if (!exists) {
			return knex.schema.createTable(DB_TABLE_TAG, function(t: any) {
				t.increments('id').primary()
				t.string('title', 512)
				t.text('description')
				t.integer('sortorder')
				t.string('colour', 512)
				t.string('icon', 512)
				t.integer('parent').unsigned()

				t.foreign('parent').references('id').inTable(DB_TABLE_TAG);
			})
		}
	})
}
