import { TABLE } from './db'

export class DeckItem {
	connectorKeys: { db: string }

	constructor(connectorKeys: { db: string }) {
		this.connectorKeys = connectorKeys
	}

	knex = (context: any) => context.connectors[this.connectorKeys.db].connection

	async getById(id: any, context: any): Promise<any> {
		let result = await this.knex(context)
			.select()
			.from(TABLE.DECK_ITEM)
			.where('id', id)

		return result && result[0]
	}

	async getByParent(parent: any, context: any): Promise<any[]> {
		let result = await this.knex(context)
			.select()
			.from(TABLE.DECK_ITEM)
			.where('parent', parent)
		return result
	}

	async upsert(payload: any, context: any): Promise<void> {
		if (payload.item.id) {
			return await this.knex(context)(TABLE.DECK_ITEM)
				.where({ id: payload.item.id })
				.update({ ...payload.item })
		} else {
			return await this.knex(context)(TABLE.DECK_ITEM).insert({
				...payload.item,
			})
		}
	}

	async delete(id: any, context: any): Promise<void> {
		return await this.knex(context)(TABLE.DECK_ITEM)
			.where({ id: id })
			.del()
	}
}

export const dropDeckItemTable = (knex: any) => {
	knex.schema.hasTable(TABLE.DECK_ITEM).then(function(exists: any) {
		if (!exists) {
			return knex.schema.dropTable(TABLE.DECK_ITEM)
		}
	})
}

export const createDeckItemTable = (knex: any) => {
	knex.schema.hasTable(TABLE.DECK_ITEM).then(function(exists: any) {
		if (!exists) {
			return knex.schema.createTable(TABLE.DECK_ITEM, function(t: any) {
				t.increments('id').primary()
				t.string('title', 512)
				t.integer('parent').unsigned()
			})
		}
	})
}
