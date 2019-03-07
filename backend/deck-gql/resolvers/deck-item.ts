export const DB_TABLE_DECKITEM = 'deckitem'

export class DeckItem {
	connectorKeys: { db: string }

	constructor(connectorKeys: { db: string }) {
		this.connectorKeys = connectorKeys
	}

	knex = (context: any) => context.connectors[this.connectorKeys.db].connection

	async getById(id: any, context: any): Promise<any> {
		let result = await this.knex(context)
			.select()
			.from(DB_TABLE_DECKITEM)
			.where('id', id)

		return result && result[0]
	}

	async getByParent(parent: any, context: any): Promise<any[]> {
		let result = await this.knex(context)
			.select()
			.from(DB_TABLE_DECKITEM)
			.where('parent', parent)
		return result
	}

	async upsert(payload: any, context: any): Promise<void> {
		if (payload.item.id) {
			return await this.knex(context)(DB_TABLE_DECKITEM)
				.where({ id: payload.item.id })
				.update({ ...payload.item })
		} else {
			return await this.knex(context)(DB_TABLE_DECKITEM).insert({
				...payload.item,
			})
		}
	}

	async delete(id: any, context: any): Promise<void> {
		return await this.knex(context)(DB_TABLE_DECKITEM)
			.where({ id: id })
			.del()
	}
}

export const dropDeckItemTable = (knex: any) => {
	knex.schema.hasTable(DB_TABLE_DECKITEM).then(function(exists: any) {
		if (!exists) {
			return knex.schema.dropTable(DB_TABLE_DECKITEM)
		}
	})
}

export const createDeckItemTable = (knex: any) => {
	knex.schema.hasTable(DB_TABLE_DECKITEM).then(function(exists: any) {
		if (!exists) {
			return knex.schema.createTable(DB_TABLE_DECKITEM, function(t: any) {
				t.increments('id').primary()
				t.string('title', 512)
				t.integer('parent').unsigned()
			})
		}
	})
}
